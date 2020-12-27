import { Token } from "typedi";

import {
    IProfileDTO,
    IProfileCreateDTO,
    IProfileUpdateDTO,
    IProfileFilterDTO,
} from ".";

export interface IProfileStorage {
    find(filter?: IProfileFilterDTO): Promise<IProfileDTO[]>;
    findOne(filter?: IProfileFilterDTO): Promise<IProfileDTO>;
    create(profileData: IProfileCreateDTO): Promise<IProfileDTO>;
    update(
        profileId: number,
        profileData: IProfileUpdateDTO,
    ): Promise<IProfileDTO>;
}

export const TProfileStorage = new Token<IProfileStorage>();
