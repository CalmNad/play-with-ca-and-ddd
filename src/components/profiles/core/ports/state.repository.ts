import { Token } from "typedi";

import { IState } from ".";

export interface IStateRepository {
    find(): Promise<IState[]>;
}

export const TStateRepository = new Token<IStateRepository>();
