import { Inject } from "typedi";
import { Arg, Query, Resolver } from "type-graphql";

import {
    IProfilesStories,
    TProfilesStories,
} from "@profiles/application/ports/api";

import { ProfileDTO, ProfileFilterDTO } from "../models";

@Resolver()
export class ProfilesResolver {
    constructor(
        @Inject(TProfilesStories)
        private readonly profilesStories: IProfilesStories,
    ) {}

    @Query(() => [ProfileDTO], {
        description: "Get all the profiles",
    })
    async profiles(
        @Arg("filter", () => ProfileFilterDTO, { nullable: true })
        filter?: ProfileFilterDTO,
    ): Promise<ProfileDTO[]> {
        return await this.profilesStories.get(filter);
    }
}
