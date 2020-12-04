import { Field, ObjectType } from "type-graphql";

import { IRole } from "@profiles/core";

@ObjectType({ description: "The profile role's model" })
export class Role implements IRole {
    @Field({ description: "The role's id" })
    id!: number;

    @Field({ description: "The role's name" })
    name!: string;
}
