export enum PROFILE_ROLES {
    HR_MANAGER = 1,
    ORDER_MANAGER = 2,
    DISPATCHER = 3,
}

export interface IRole {
    id: number;
    name: string;
}
