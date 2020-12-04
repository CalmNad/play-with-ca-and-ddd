import { InjectRepository } from "typeorm-typedi-extensions";
import { Repository } from "typeorm";
import { Service } from "typedi";

import {
    IProfileDTO,
    IProfileRepository,
    TProfileRepository,
    IProfileCreateDTO,
    IProfileUpdateDTO,
} from "@profiles/core";

import { Profile } from "../models";

@Service(TProfileRepository)
export class ProfileRepository implements IProfileRepository {
    constructor(
        @InjectRepository(Profile)
        private profileRepository: Repository<Profile>,
    ) {}

    async find(): Promise<IProfileDTO[]> {
        let rs = await this.profileRepository.find({
            relations: ["state", "roles"],
        });
        return rs;
    }

    async create(profileData: IProfileCreateDTO): Promise<IProfileDTO> {
        let newProfile = this.profileRepository.create(profileData);
        newProfile.password = "123";
        let rs = await this.profileRepository.save(newProfile);
        return await this.profileRepository.findOneOrFail(rs.id, {
            relations: ["state", "roles"],
        });
        // return rs;
    }

    async update(
        profileId: number,
        profileData: IProfileUpdateDTO,
    ): Promise<IProfileDTO> {
        // let oldProfile =
        this.profileRepository.findOneOrFail(profileId);
        let profile = this.profileRepository.create(profileData);
        profile.id = profileId;

        let rs = await this.profileRepository.save(profile);

        return await this.profileRepository.findOneOrFail(rs.id, {
            relations: ["state", "roles"],
        });
    }
}
