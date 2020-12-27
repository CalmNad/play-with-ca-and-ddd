import "reflect-metadata";
require("module-alias/register");

import { ApolloServer } from "apollo-server";
import { Container } from "typedi";
import * as path from "path";
import * as TypeORM from "typeorm";

const debug = require("debug")("hr:infrastructure:server-graphql");

require("dotenv").config({
    path: path.resolve(__dirname, `.env.${process.env.TIER}`),
});

import {
    // AuthInfo,
    ProfileDTO,
    ProfileCreateDTO,
    RoleDTO,
    StateDTO,
} from "@profiles/adapters/graphql/models";
import {
    permissions,
    AuthResolver,
    ProfileResolver,
    ProfilesResolver,
    RoleResolver,
    StateResolver,
} from "@profiles/adapters/graphql";

import { config } from "./typeorm";
import { buildFederatedSchema } from "./graphql";
import { applyMiddleware } from "graphql-middleware";

import "@profiles";

// console.log("role:", RoleStorage, RolesStories);

async function bootstrap() {
    const log = debug.extend("bootstrap");
    log("begin");

    try {
        TypeORM.useContainer(Container);
        await TypeORM.createConnection(config);

        const schema = await buildFederatedSchema({
            resolvers: [
                AuthResolver,
                ProfileResolver,
                ProfilesResolver,
                RoleResolver,
                StateResolver,
            ],
            orphanedTypes: [
                // AuthInfo,
                ProfileDTO,
                ProfileCreateDTO,
                RoleDTO,
                StateDTO,
            ],
        });

        // Create GraphQL server
        const server = new ApolloServer({
            schema: applyMiddleware(schema, permissions),
            context: ({ req }) => {
                // TBD: правильно ли то, что пользователя гонит нам header?
                console.log("get context:", req.headers.user);
                const user = req.headers.user
                    ? JSON.parse(req.headers.user)
                    : null;
                return { user };
            },
            playground: true, // enable GraphQL Playground
        });
        log("create apollo server:", server);

        // TODO: move port to config
        const { url } = await server.listen(4001);
        console.log(
            `Server is running, GraphQL Playground available at ${url}`,
        );
    } catch (error) {
        console.log(`ERROR:${error}`);
    }
}

bootstrap();
