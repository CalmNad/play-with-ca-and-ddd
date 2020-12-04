import { buildFederatedSchema } from "./graphql-federated-schema";
import { graphql, GraphQLSchema } from "graphql";
import { Maybe } from "type-graphql";

import { Profile, Role, State } from "@profiles/adapters/graphql";
import {
    ProfileResolver,
    RoleResolver,
    StateResolver,
} from "@profiles/adapters/graphql";

interface Options {
    source: string;
    variableValues?: Maybe<{
        [key: string]: any;
    }>;
}

let schema: GraphQLSchema;

export const graphqlCall = async ({ source, variableValues }: Options) => {
    if (!schema) {
        schema = await buildFederatedSchema({
            resolvers: [ProfileResolver, RoleResolver, StateResolver],
            orphanedTypes: [Profile, Role, State],
        });
    }

    return graphql({
        schema: schema,
        source,
        variableValues,
    });
};
