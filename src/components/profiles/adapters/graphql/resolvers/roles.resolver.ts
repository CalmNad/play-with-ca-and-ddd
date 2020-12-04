import { Inject } from "typedi";
import { Query, Resolver } from "type-graphql";

import { IRoleService, TRoleService } from "@profiles/core";

import { Role } from "../models";

@Resolver()
export class RoleResolver {
    constructor(
        @Inject(TRoleService)
        private readonly roleService: IRoleService,
    ) {}

    @Query(() => [Role], { description: "Get all the profile's roles" })
    async roles(): Promise<Role[]> {
        return await this.roleService.read();
    }
}
