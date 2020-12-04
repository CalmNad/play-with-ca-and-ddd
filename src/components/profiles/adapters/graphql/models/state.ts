import { Field, ObjectType } from "type-graphql";

import { IState } from "@profiles/core";

@ObjectType({ description: "The profile states' model" })
export class State implements IState {
    @Field({ description: "The state's id" })
    id!: number;

    @Field({ description: "The state's name" })
    name!: string;
}
