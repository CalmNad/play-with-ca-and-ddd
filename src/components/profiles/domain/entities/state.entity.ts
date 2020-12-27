export enum PROFILE_STATES {
    ACTIVE = 1,
    FROZEN = 2,
    DELETED = 3,
}

export interface IState {
    id: number;
    name: string;
}
