import { Token } from "typedi";

import {
    IProfileDTO,
    IProfileCreateDTO,
    IProfileFilterDTO,
    IProfileUpdateDTO,
} from ".";

export interface IProfileStories {
    get(filter?: IProfileFilterDTO): Promise<IProfileDTO>;
    create(profileData: IProfileCreateDTO): Promise<IProfileDTO>;
    update(
        profileId: number,
        profileData: IProfileUpdateDTO,
    ): Promise<IProfileDTO>;
    updateState(profileId: number, stateId: number): Promise<IProfileDTO>;
}

export const TProfileStories = new Token<IProfileStories>();
