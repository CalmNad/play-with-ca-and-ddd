import { InjectRepository } from "typeorm-typedi-extensions";
import { Repository } from "typeorm";
import { Service } from "typedi";

import { IState, IStateRepository, TStateRepository } from "@profiles/core";

import { State } from "../models";

@Service(TStateRepository)
export class StateRepository implements IStateRepository {
    constructor(
        @InjectRepository(State)
        private stateRepository: Repository<State>,
    ) {}

    async find(): Promise<IState[]> {
        return await this.stateRepository.find();
    }
}
