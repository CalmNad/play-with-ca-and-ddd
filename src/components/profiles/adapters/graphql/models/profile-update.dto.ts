import { Field, InputType } from "type-graphql";

import {
    IProfileUpdateDTO,
    IRoleIdDTO,
    IStateIdDTO,
} from "@profiles/application/ports/api";

import { RoleIdDTO, StateIdDTO } from ".";

@InputType()
export class ProfileUpdateDTO implements IProfileUpdateDTO {
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

    @Field(() => [RoleIdDTO], { nullable: true })
    roles?: IRoleIdDTO[];

    @Field(() => StateIdDTO, { nullable: true })
    state?: IStateIdDTO;
}
