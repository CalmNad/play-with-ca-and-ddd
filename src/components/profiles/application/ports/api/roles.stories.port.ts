import { Token } from "typedi";

import { IRoleDTO } from ".";

export interface IRolesStories {
    get(): Promise<IRoleDTO[]>;
}

export const TRolesStories = new Token<IRolesStories>();
