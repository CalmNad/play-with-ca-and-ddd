import { IProfile } from "@profiles/domain/entities";

// import { IRoleDTO, IStateDTO } from ".";

export interface IProfileDTO
    extends Pick<
        IProfile,
        | "id"
        | "nickname"
        | "firstName"
        | "lastName"
        | "phone"
        | "email"
        | "roles"
        | "state"
    > {}
