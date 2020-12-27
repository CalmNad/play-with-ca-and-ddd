import { Inject } from "typedi";
import { Query, Resolver } from "type-graphql";

import {
    IStatesStories,
    TStatesStories,
} from "@profiles/application/ports/api";

import { StateDTO } from "../models";

@Resolver()
export class StateResolver {
    constructor(
        @Inject(TStatesStories)
        private readonly statesStories: IStatesStories,
    ) {}

    @Query(() => [StateDTO], { description: "Get all the profile's states" })
    async states(): Promise<StateDTO[]> {
        return await this.statesStories.get();
    }
}
