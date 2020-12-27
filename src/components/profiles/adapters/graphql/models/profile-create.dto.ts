import { Field, InputType } from "type-graphql";

import {
    IProfileCreateDTO,
    IRoleIdDTO,
    IStateIdDTO,
} from "@profiles/application/ports/api";

import { RoleIdDTO, StateIdDTO } from ".";

@InputType()
export class ProfileCreateDTO implements IProfileCreateDTO {
    @Field()
    nickname?: string;

    @Field()
    firstName!: string;

    @Field()
    lastName!: string;

    @Field()
    phone?: string;

    @Field()
    email!: string;

    @Field(() => [RoleIdDTO])
    roles!: IRoleIdDTO[];

    @Field(() => StateIdDTO)
    state!: IStateIdDTO;
}
