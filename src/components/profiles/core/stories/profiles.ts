import { Service, Token, Inject } from "typedi";

import {
    IProfileDTO,
    IProfileCreateDTO,
    IProfileUpdateDTO,
    IProfileRepository,
    TProfileRepository,
} from "..";

// TBD: вынести в ports?
export interface IProfileService {
    create(profileData: IProfileCreateDTO): Promise<IProfileDTO>;
    read(): Promise<IProfileDTO[]>;
    update(
        profileId: number,
        profileData: IProfileUpdateDTO,
    ): Promise<IProfileDTO>;
    updateState(profileId: number, stateId: number): Promise<IProfileDTO>;
}

export const TProfileService = new Token<IProfileService>();

@Service(TProfileService)
export class ProfileService implements IProfileService {
    constructor(
        @Inject(TProfileRepository)
        private readonly profileRepository: IProfileRepository,
    ) {}

    async create(profileData: IProfileCreateDTO): Promise<IProfileDTO> {
        return await this.profileRepository.create(profileData);
    }

    async read(): Promise<IProfileDTO[]> {
        return this.profileRepository.find();
    }

    async update(
        profileId: number,
        profileData: IProfileUpdateDTO,
    ): Promise<IProfileDTO> {
        return await this.profileRepository.update(profileId, profileData);
    }

    async updateState(
        profileId: number,
        stateId: number,
    ): Promise<IProfileDTO> {
        return await this.profileRepository.update(profileId, {
            state: {
                id: stateId,
            },
        } as IProfileUpdateDTO);
    }
}
