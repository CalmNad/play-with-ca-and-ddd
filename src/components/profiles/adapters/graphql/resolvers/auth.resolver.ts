import { Inject } from "typedi";
import { Ctx, Query, Resolver } from "type-graphql";
// import { ApolloError } from "apollo-server";

import {
    IProfileStories,
    TProfileStories,
} from "@profiles/application/ports/api";

import { ProfileDTO, ProfileFilterDTO } from "../models";

// import { AuthInfo } from "..";

// const debug = require("debug")(
//     "hr:components:profiles:adapters:graphql:resolvers:auth",
// );

@Resolver()
export class AuthResolver {
    constructor(
        @Inject(TProfileStories)
        private readonly profileStories: IProfileStories,
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

    //     @Mutation(() => AuthInfo, { description: "" })
    //     async login(
    //         @Arg("email", () => String)
    //         email: string,
    //         @Arg("password", () => String)
    //         password: string,
    //     ): Promise<AuthInfo> {
    //         const log = debug.extend("login");
    //         log("email", email);

    //         try {
    //             const rs = await this.profileService.login(email, password);
    //             log("rs", rs);
    //             return rs;
    //         } catch (error) {
    //             log("error", error);
    //             if ("AuthError" == error.name) {
    //                 throw new ApolloError(error.message, error.code);
    //             }
    //             throw new ApolloError(
    //                 "Internal server error (auth)",
    //                 "AUTH_INTERNAL_ERROR",
    //             );
    //         }
    //     }

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
