import { Inject } from "typedi";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
// TBD: определиться с источником классов ошибок
import { ApolloError } from "apollo-server";

import {
    // TODO: перенести me в auth.stories
    IProfileStories,
    TProfileStories,
    IAuthStories,
    TAuthStories,
} from "@profiles/application/ports/api";

import {
    AuthInfoDTO,
    AuthLoginDTO,
    ProfileDTO,
    ProfileFilterDTO,
} from "../models";

const debug = require("debug")(
    "hr:components:profiles:adapters:graphql:resolvers:auth",
);

@Resolver()
export class AuthResolver {
    constructor(
        @Inject(TProfileStories)
        private readonly profileStories: IProfileStories,
        @Inject(TAuthStories)
        private readonly authStories: IAuthStories,
    ) {}

    @Query(() => ProfileDTO, {
        description: "Get 'my' profile",
    })
    async me(
        @Ctx()
        ctx: any,
    ): Promise<ProfileDTO> {
        return await this.profileStories.get(<ProfileFilterDTO>{
            id: ctx.user.id,
        });
    }

    @Mutation(() => AuthInfoDTO, { description: "" })
    async login(
        @Arg("data", () => AuthLoginDTO)
        login: AuthLoginDTO,
    ): Promise<AuthInfoDTO> {
        const log = debug.extend("login");
        log("login", login);

        try {
            const rs = await this.authStories.login(login);
            log("rs", rs);
            return rs;
        } catch (error) {
            log("error", error);
            if ("AuthError" == error.name) {
                throw new ApolloError(error.message, error.code);
            }
            throw new ApolloError(
                "Internal server error (auth)",
                "AUTH_INTERNAL_ERROR",
            );
        }
    }

    //     @Mutation(() => AuthInfo, { description: "" })
    //     async refresh(
    //         @Ctx()
    //         ctx: any,
    //         @Arg("token", () => String)
    //         token: string,
    //     ): Promise<AuthInfo> {
    //         const log = debug.extend("refresh");
    //         log("token", token);

    //         return this.profileService.
    //     }
}
