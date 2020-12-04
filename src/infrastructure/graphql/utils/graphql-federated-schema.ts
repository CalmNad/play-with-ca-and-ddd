import { addResolversToSchema, GraphQLResolverMap } from "apollo-graphql";
import {
    buildFederatedSchema as buildApolloFederationSchema,
    printSchema,
} from "@apollo/federation";
import {
    buildSchema,
    BuildSchemaOptions,
    createResolversMap,
} from "type-graphql";
import { Container } from "typedi";
import { resolve } from "path";
import { specifiedDirectives } from "graphql";
import gql from "graphql-tag";

import federationDirectives from "@apollo/federation/dist/directives";

export async function buildFederatedSchema(
    options: Omit<BuildSchemaOptions, "skipCheck">,
    referenceResolvers?: GraphQLResolverMap<any>,
) {
    const schema = await buildSchema({
        ...options,
        directives: [
            ...specifiedDirectives,
            ...federationDirectives,
            ...(options.directives || []),
        ],
        skipCheck: true,
        emitSchemaFile: resolve(__dirname, "../schema.gql"),
        container: Container,
        validate: false,
    });

    const federatedSchema = buildApolloFederationSchema({
        typeDefs: gql(printSchema(schema)),
        resolvers: createResolversMap(schema) as any,
    });

    if (referenceResolvers) {
        addResolversToSchema(federatedSchema, referenceResolvers);
    }
    return federatedSchema;
}
