import { Field, InputType } from "type-graphql";

import { IStateIdDTO } from "@profiles/application/ports/api";

@InputType()
export class StateIdDTO implements IStateIdDTO {
    @Field({ description: "The state's id" })
    id!: number;
}
