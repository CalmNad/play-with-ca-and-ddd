export interface IStateFilterDTO {
    id: number;
}

export interface IProfileFilterDTO {
    id?: number;
    nickname?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    email?: string;
    state?: IStateFilterDTO;
}
