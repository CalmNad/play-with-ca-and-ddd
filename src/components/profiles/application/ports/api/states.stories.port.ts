import { Token } from "typedi";

import { IStateDTO } from ".";

export interface IStatesStories {
    get(): Promise<IStateDTO[]>;
}

export const TStatesStories = new Token<IStatesStories>();
