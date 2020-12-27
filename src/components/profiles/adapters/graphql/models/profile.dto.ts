import { Directive, Field, ObjectType } from "type-graphql";

import { IProfileDTO } from "@profiles/application/ports/api";

import { RoleDTO, StateDTO } from ".";

@Directive(`@key(fields: "id")`)
@ObjectType({ description: "The profile's model" })
export class ProfileDTO implements IProfileDTO {
    @Field({ description: "The profile's id" })
    id!: number;

    @Field({ nullable: true, description: "The profile's nickname" })
    nickname?: string;

    @Field({ description: "" })
    firstName!: string;

    @Field({ description: "" })
    lastName!: string;

    @Field({ nullable: true, description: "" })
    phone?: string;

    @Field({ description: "" })
    email!: string;

    @Field(() => [RoleDTO], { description: "" })
    roles!: Partial<RoleDTO>[];

    @Field(() => StateDTO, { description: "" })
    state!: Partial<StateDTO>;
}
