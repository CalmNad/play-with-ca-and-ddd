import { InjectRepository } from "typeorm-typedi-extensions";
import { Repository } from "typeorm";
import { Service } from "typedi";

import {
    IStateDTO,
    IStateStorage,
    TStateStorage,
} from "@profiles/application/ports/storage";

import { State } from "../models";

@Service(TStateStorage)
export class StateStorage implements IStateStorage {
    constructor(
        @InjectRepository(State)
        private stateStorage: Repository<State>,
    ) {}

    async find(): Promise<IStateDTO[]> {
        return await this.stateStorage.find();
    }
}
