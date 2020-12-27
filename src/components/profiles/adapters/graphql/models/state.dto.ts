import { Field, ObjectType } from "type-graphql";

import { IStateDTO } from "@profiles/application/ports/api";

@ObjectType({ description: "The profile states' model" })
export class StateDTO implements IStateDTO {
    @Field({ description: "The state's id" })
    id!: number;

    @Field({ description: "The state's name" })
    name!: string;
}
