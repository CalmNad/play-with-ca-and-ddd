import { Field, InputType } from "type-graphql";

import { IRoleIdDTO } from "@profiles/application/ports/api";

@InputType()
export class RoleIdDTO implements IRoleIdDTO {
    @Field({ description: "The role's id" })
    id!: number;
}
