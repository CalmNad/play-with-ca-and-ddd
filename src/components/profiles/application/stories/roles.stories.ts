import { Service, Inject } from "typedi";

import { IRoleDTO, IRolesStories, TRolesStories } from "../ports/api";
import { IRoleStorage, TRoleStorage } from "../ports/storage";

@Service(TRolesStories)
export class RolesStories implements IRolesStories {
    constructor(
        @Inject(TRoleStorage)
        private readonly roleStorage: IRoleStorage,
    ) {}

    async get(): Promise<IRoleDTO[]> {
        return this.roleStorage.find();
    }
}
