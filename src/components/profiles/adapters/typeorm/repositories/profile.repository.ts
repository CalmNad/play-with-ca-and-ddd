import { InjectRepository } from "typeorm-typedi-extensions";
import { Repository } from "typeorm";
import { Service } from "typedi";

import {
    IProfileDTO,
    IProfileCreateDTO,
    IProfileUpdateDTO,
    IProfileFilterDTO,
    IProfileStorage,
    TProfileStorage,
} from "@profiles/application/ports/storage";

import { Profile } from "../models";

// TBD: есть profile.stories и profiles.stories. возможно надо различать методы?
@Service(TProfileStorage)
export class ProfileStorage implements IProfileStorage {
    constructor(
        @InjectRepository(Profile)
        private profileRepository: Repository<Profile>,
    ) {}

    async find(filter?: IProfileFilterDTO): Promise<IProfileDTO[]> {
        let rs = await this.profileRepository.find({
            where: filter,
            relations: ["state", "roles"],
        });
        return rs;
    }

    async findOne(filter?: IProfileFilterDTO): Promise<IProfileDTO> {
        let rs = await this.profileRepository.findOneOrFail({
            where: filter,
            relations: ["state", "roles"],
        });
        return rs;
    }

    // TODO: вынести генерацию пароля в app или domain. разделить DTO от api и DTO для storage (первый без пароля, второй - с)
    async create(profileData: IProfileCreateDTO): Promise<IProfileDTO> {
        const newProfile = await this.profileRepository.save(
            this.profileRepository.create(profileData),
        );
        return await this.profileRepository.findOneOrFail(newProfile.id, {
            relations: ["state", "roles"],
        });
    }

    // async findOne(where: any): Promise<IProfileDTO> {
    //     return await this.profileRepository.findOneOrFail(where, {
    //         relations: ["state", "roles"],
    //     });
    // }

    async update(
        profileId: number,
        profileData: IProfileUpdateDTO,
    ): Promise<IProfileDTO> {
        // TBD: ?переработать набор входных параметров с profileId + profileData на profileData, содержащий profileId
        this.profileRepository.findOneOrFail(profileId);
        let profile = this.profileRepository.create(profileData);
        profile.id = profileId;

        let rs = await this.profileRepository.save(profile);

        return await this.profileRepository.findOneOrFail(rs.id, {
            relations: ["state", "roles"],
        });
    }
}
