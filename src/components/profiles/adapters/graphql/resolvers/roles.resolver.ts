import { Inject } from "typedi";
import { Query, Resolver } from "type-graphql";

import { IRolesStories, TRolesStories } from "@profiles/application/ports/api";

import { RoleDTO } from "../models";

@Resolver()
export class RoleResolver {
    constructor(
        @Inject(TRolesStories)
        private readonly rolesStories: IRolesStories,
    ) {}

    @Query(() => [RoleDTO], { description: "Get all the profile's roles" })
    async roles(): Promise<RoleDTO[]> {
        return await this.rolesStories.get();
    }
}
