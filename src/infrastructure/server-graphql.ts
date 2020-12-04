import "reflect-metadata";
require("module-alias/register");

import { ApolloServer } from "apollo-server";
import { Container } from "typedi";
import * as path from "path";
import * as TypeORM from "typeorm";

require("dotenv").config({
    path: path.resolve(__dirname, `.env.${process.env.TIER}`),
});

// FIXME: разобраться, почему без "хотя бы одного Container.get" сыпется ошибка. коряво выглядит решение.
// tslint//:// disable-next-line
import {
    // ProfileRepository,
    StateRepository,
    // RoleRepository,
} from "@profiles/adapters/typeorm";

import { Profile, Role, State } from "@profiles/adapters/graphql";
import {
    ProfileResolver,
    RoleResolver,
    StateResolver,
} from "@profiles/adapters/graphql";

import { config } from "./typeorm";
import { buildFederatedSchema } from "./graphql";

async function bootstrap() {
    try {
        TypeORM.useContainer(Container);
        await TypeORM.createConnection(config);

        Container.get(StateRepository);
        // Container.get(RoleRepository);
        // Container.get(ProfileRepository);

        const schema = await buildFederatedSchema({
            resolvers: [ProfileResolver, RoleResolver, StateResolver],
            orphanedTypes: [Profile, Role, State],
        });

        // Create GraphQL server
        const server = new ApolloServer({
            schema,
            playground: true, // enable GraphQL Playground
        });

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
