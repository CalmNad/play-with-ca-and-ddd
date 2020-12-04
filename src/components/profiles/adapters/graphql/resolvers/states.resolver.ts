import { Inject } from "typedi";
import { Query, Resolver } from "type-graphql";

import { IStateService, TStateService } from "@profiles/core";

import { State } from "../models";

@Resolver()
export class StateResolver {
    constructor(
        @Inject(TStateService)
        private readonly stateService: IStateService,
    ) {}

    @Query(() => [State], { description: "Get all the profile's states" })
    async states(): Promise<State[]> {
        return await this.stateService.read();
    }
}
