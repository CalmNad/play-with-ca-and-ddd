import { Field, ObjectType } from "type-graphql";

import { IRoleDTO } from "@profiles/application/ports/api";

@ObjectType({ description: "The profile role's model" })
export class RoleDTO implements IRoleDTO {
    @Field({ description: "The role's id" })
    id!: number;

    @Field({ description: "The role's name" })
    name!: string;
}
