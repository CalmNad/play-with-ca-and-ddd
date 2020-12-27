import { InjectRepository } from "typeorm-typedi-extensions";
import { Repository } from "typeorm";
import { Service } from "typedi";

import {
    IRoleDTO,
    IRoleStorage,
    TRoleStorage,
} from "@profiles/application/ports/storage";

import { Role } from "../models";

@Service(TRoleStorage)
export class RoleStorage implements IRoleStorage {
    constructor(
        @InjectRepository(Role)
        private roleStorage: Repository<Role>,
    ) {}

    async find(): Promise<IRoleDTO[]> {
        return await this.roleStorage.find();
    }
}
