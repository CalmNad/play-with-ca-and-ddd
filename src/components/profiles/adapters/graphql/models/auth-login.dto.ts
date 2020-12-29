import { Field, InputType } from "type-graphql";

import { IAuthLoginDTO } from "@profiles/application/ports/api";

@InputType({ description: "" })
export class AuthLoginDTO implements IAuthLoginDTO {
    @Field({ description: "" })
    email!: string;

    @Field({ description: "" })
    password!: string;
}
