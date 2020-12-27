import { Inject } from "typedi";
import { Arg, Mutation, Resolver } from "type-graphql";

import {
    IProfileStories,
    TProfileStories,
} from "@profiles/application/ports/api";

import { ProfileDTO, ProfileCreateDTO, ProfileUpdateDTO } from "../models";

@Resolver()
export class ProfileResolver {
    constructor(
        @Inject(TProfileStories)
        private readonly profileStories: IProfileStories,
    ) {}

    @Mutation(() => ProfileDTO)
    async createProfile(
        @Arg("data", () => ProfileCreateDTO)
        profileData: ProfileCreateDTO,
    ): Promise<ProfileDTO> {
        return await this.profileStories.create(profileData);
    }

    @Mutation(() => ProfileDTO)
    async updateProfile(
        @Arg("id")
        id: number,
        @Arg("data", () => ProfileUpdateDTO)
        profileData: ProfileUpdateDTO,
    ): Promise<ProfileDTO> {
        return await this.profileStories.update(id, profileData);
    }

    @Mutation(() => ProfileDTO)
    async updateProfileState(
        @Arg("id")
        id: number,
        @Arg("stateId")
        stateId: number,
    ): Promise<ProfileDTO> {
        return await this.profileStories.updateState(id, stateId);
    }
}
