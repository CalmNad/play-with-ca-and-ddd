import { Token } from "typedi";

import { IProfileDTO, IProfileFilterDTO } from ".";

export interface IProfilesStories {
    get(filter?: IProfileFilterDTO): Promise<IProfileDTO[]>;
}

export const TProfilesStories = new Token<IProfilesStories>();
