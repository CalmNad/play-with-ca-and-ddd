import { Service, Token, Inject } from "typedi";

import { IRole, IRoleRepository, TRoleRepository } from "..";

export interface IRoleService {
    read(): Promise<IRole[]>;
}

export const TRoleService = new Token<IRoleService>();

@Service(TRoleService)
export class RoleService implements IRoleService {
    constructor(
        @Inject(TRoleRepository)
        private readonly roleRepository: IRoleRepository,
    ) {}

    async read(): Promise<IRole[]> {
        return this.roleRepository.find();
    }
}
