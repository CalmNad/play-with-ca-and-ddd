import { Token } from "typedi";

import { IRole } from ".";

export interface IRoleRepository {
    find(): Promise<IRole[]>;
}

export const TRoleRepository = new Token<IRoleRepository>();
