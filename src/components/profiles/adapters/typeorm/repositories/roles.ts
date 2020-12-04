import { InjectRepository } from "typeorm-typedi-extensions";
import { Repository } from "typeorm";
import { Service } from "typedi";

import { IRole, IRoleRepository, TRoleRepository } from "@profiles/core";

import { Role } from "../models";

@Service(TRoleRepository)
export class RoleRepository implements IRoleRepository {
    constructor(
        @InjectRepository(Role)
        private roleRepository: Repository<Role>,
    ) {}

    async find(): Promise<IRole[]> {
        return await this.roleRepository.find();
    }
}
