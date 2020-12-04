import { Token } from "typedi";

import { IProfileDTO, IProfileCreateDTO, IProfileUpdateDTO } from ".";

export interface IProfileRepository {
    find(): Promise<IProfileDTO[]>;
    create(profileData: IProfileCreateDTO): Promise<IProfileDTO>;
    update(
        profileId: number,
        profileData: IProfileUpdateDTO,
    ): Promise<IProfileDTO>;
    // updateState(profileId: number, stateId: number): Promise<IProfile>;
}

export const TProfileRepository = new Token<IProfileRepository>();
