import { Field, ObjectType } from "type-graphql";

import { IAuthInfoDTO } from "@profiles/application/ports/api";

@ObjectType({ description: "" })
export class AuthInfoDTO implements IAuthInfoDTO {
    @Field({ description: "" })
    accessToken!: string;

    @Field({ description: "" })
    refreshToken!: string;
}
