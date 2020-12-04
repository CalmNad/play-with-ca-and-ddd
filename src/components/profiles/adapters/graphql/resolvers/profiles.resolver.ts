import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Inject } from "typedi";

import { IProfileService, TProfileService } from "@profiles/core";

import { Profile, ProfileCreateDTO, ProfileUpdateDTO } from "../models";

@Resolver()
export class ProfileResolver {
    constructor(
        @Inject(TProfileService)
        private readonly profileService: IProfileService,
    ) {}

    @Query(() => [Profile], {
        description: "Get all the profiles",
    })
    async profiles(): Promise<Profile[]> {
        return await this.profileService.read();
    }

    @Mutation(() => Profile)
    async createProfile(
        @Arg("data", () => ProfileCreateDTO)
        profileData: ProfileCreateDTO,
    ): Promise<Profile> {
        return await this.profileService.create(profileData);
    }

    @Mutation(() => Profile)
    async updateProfile(
        @Arg("id")
        id: number,
        @Arg("data", () => ProfileUpdateDTO)
        profileData: ProfileUpdateDTO,
    ): Promise<Profile> {
        return await this.profileService.update(id, profileData);
    }

    // ??? naming profile.updateState?
    @Mutation(() => Profile)
    async updateProfileState(
        @Arg("id")
        id: number,
        @Arg("stateId")
        stateId: number,
    ): Promise<Profile> {
        return await this.profileService.updateState(id, stateId);
    }
}
