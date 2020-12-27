import { Token } from "typedi";

import { IStateDTO } from ".";

export interface IStateStorage {
    find(): Promise<IStateDTO[]>;
}

export const TStateStorage = new Token<IStateStorage>();
