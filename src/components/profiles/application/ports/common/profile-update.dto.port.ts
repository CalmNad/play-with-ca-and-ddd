// TODO: разобраться со схемой типов и их производных
import { IRoleIdDTO, IStateIdDTO } from ".";

export interface IProfileUpdateDTO {
    nickname?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    email?: string;
    roles?: IRoleIdDTO[];
    state?: IStateIdDTO;
}

// import { IProfile } from "@profiles/domain/entities";

// export interface IProfileUpdateDTO
//     extends Partial<
//         Pick<
//             IProfile,
//             | "nickname"
//             | "firstName"
//             | "lastName"
//             | "phone"
//             | "email"
//             | "roles"
//             | "state"
//         >
//     > {}
