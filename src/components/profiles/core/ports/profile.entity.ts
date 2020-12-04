import { IRole, IRoleDTO, IState, IStateDTO } from ".";

export interface IProfileDTO {
    id: number;
    nickname: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    password: string;
    roles: IRole[];
    state: IState;
}

export interface IProfileCreateDTO {
    nickname?: string;
    firstName: string;
    lastName: string;
    phone?: string;
    email: string;
    roles: IRoleDTO[];
    state: IStateDTO;
}

export interface IProfileUpdateDTO {
    nickname?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    email?: string;
    roles?: IRoleDTO[];
    state?: IStateDTO;
}
