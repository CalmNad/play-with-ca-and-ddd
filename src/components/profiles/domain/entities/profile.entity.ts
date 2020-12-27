import { IRole, IState } from ".";

export interface IProfile {
    id: number;
    nickname?: string;
    firstName: string;
    lastName: string;
    phone?: string;
    email: string;
    password: string;
    roles: Partial<IRole>[];
    state: Partial<IState>;
}

export class Profile implements IProfile {
    id!: number;
    nickname!: string;
    firstName!: string;
    lastName!: string;
    phone!: string;
    email!: string;
    password!: string;
    roles!: Partial<IRole>[];
    state!: Partial<IState>;

    constructor(partial: Partial<IProfile>) {
        Object.assign(this, partial);
    }

    // TODO: усложнить, добавив получение данных из .env.<prod|dev|...>
    generateNewPassword() {
        this.password = "123";
    }
}
