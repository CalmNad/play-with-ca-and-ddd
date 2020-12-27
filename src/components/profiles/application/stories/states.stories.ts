import { Service, Inject } from "typedi";

import { IStateDTO, IStatesStories, TStatesStories } from "../ports/api";
import { IStateStorage, TStateStorage } from "../ports/storage";

@Service(TStatesStories)
export class StatesStories implements IStatesStories {
    constructor(
        @Inject(TStateStorage)
        private readonly stateStorage: IStateStorage,
    ) {}

    async get(): Promise<IStateDTO[]> {
        return this.stateStorage.find();
    }
}
