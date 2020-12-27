import { Token } from "typedi";

import { IRoleDTO } from ".";

export interface IRoleStorage {
    find(): Promise<IRoleDTO[]>;
}

export const TRoleStorage = new Token<IRoleStorage>();
