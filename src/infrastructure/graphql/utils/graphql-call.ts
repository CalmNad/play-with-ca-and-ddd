// TODO: юзать для запуска тестового и рабочего сервера один код
import { buildFederatedSchema } from "./graphql-federated-schema";
import { applyMiddleware } from "graphql-middleware";
import { graphql, GraphQLSchema } from "graphql";
import { Maybe } from "type-graphql";

import {
    // AuthInfo,
    ProfileDTO,
    ProfileCreateDTO,
    RoleDTO,
    StateDTO,
} from "@profiles/adapters/graphql/models";
// TODO: объединить импорт и использование из server-graphql и graphql-call
import {
    permissions,
    AuthResolver,
    ProfileResolver,
    ProfilesResolver,
    RoleResolver,
    StateResolver,
} from "@profiles/adapters/graphql";

import "@profiles";

const debug = require("debug")("hr:infrastructure:graphql:utils:graphql-call");

interface Options {
    source: string;
    variableValues?: Maybe<{
        [key: string]: any;
    }>;
    contextValue?: Maybe<{
        [key: string]: any;
    }>;
}

let schema: GraphQLSchema;

// import * as TypeORM from "typeorm";
// import { Container } from "typedi";
// import { RolesStories } from "@profiles/application/stories/roles.stories";

// TypeORM.useContainer(Container);
// // await TypeORM.createConnection(config);
// // Container.get(StateRepository);
// Container.set(RolesStories);

export const graphqlCall = async ({
    source,
    variableValues,
    contextValue,
}: Options) => {
    const log = debug.extend("graphqlCall");

    if (!schema) {
        schema = await buildFederatedSchema({
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
    }

    const rs = graphql({
        schema: applyMiddleware(schema, permissions),
        source,
        variableValues,
        contextValue,
    });
    log(await rs);

    return rs;
};
