import { InputType, Field } from "type-graphql";

import {
    IProfileFilterDTO,
    IStateFilterDTO,
} from "@profiles/application/ports/api";

@InputType()
export class StateFilterDTO implements IStateFilterDTO {
    @Field()
    id!: number;
}

@InputType()
export class ProfileFilterDTO implements IProfileFilterDTO {
    @Field({ nullable: true })
    nickname?: string;

    @Field({ nullable: true })
    firstName?: string;

    @Field({ nullable: true })
    lastName?: string;

    @Field({ nullable: true })
    phone?: string;

    @Field({ nullable: true })
    email?: string;

    @Field(() => StateFilterDTO, { nullable: true })
    state?: StateFilterDTO;
}
