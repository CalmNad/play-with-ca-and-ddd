import { IProfile } from "@profiles/domain/entities";

export interface IProfileCreateDTO
    extends Pick<
        IProfile,
        | "nickname"
        | "firstName"
        | "lastName"
        | "phone"
        | "email"
        | "password"
        | "roles"
        | "state"
    > {}
