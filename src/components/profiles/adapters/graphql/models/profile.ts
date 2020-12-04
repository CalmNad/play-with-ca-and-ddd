import { Directive, InputType, Field, ObjectType } from "type-graphql";

import {
    IProfileDTO,
    IProfileCreateDTO,
    IProfileUpdateDTO,
    IRoleDTO,
    IStateDTO,
} from "@profiles/core";

import { Role, State } from ".";

@Directive(`@key(fields: "id")`)
@ObjectType({ description: "The profile's model" })
export class Profile implements IProfileDTO {
    @Field({ description: "The profile's id" })
    id!: number;

    @Field({ nullable: true, description: "The profile's nickname" })
    nickname!: string;

    @Field({ description: "" })
    firstName!: string;

    @Field({ description: "" })
    lastName!: string;

    @Field({ nullable: true, description: "" })
    phone!: string;

    @Field({ description: "" })
    email!: string;

    @Field({ nullable: true, description: "" })
    password!: string;

    @Field(() => [Role], { description: "" })
    roles!: Role[];

    @Field(() => State, { description: "" })
    state!: State;
}

@InputType()
export class StateDTO implements Partial<IStateDTO> {
    @Field()
    id!: number;
}

@InputType()
export class RoleDTO implements Partial<IRoleDTO> {
    @Field()
    id!: number;
}

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

    @Field(() => [RoleDTO])
    roles!: RoleDTO[];

    @Field(() => StateDTO)
    state!: StateDTO;
}

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

    @Field(() => [RoleDTO], { nullable: true })
    roles?: RoleDTO[];

    @Field(() => StateDTO, { nullable: true })
    state?: StateDTO;
}
