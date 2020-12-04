import { Service, Token, Inject } from "typedi";

import { IState, IStateRepository, TStateRepository } from "..";

export interface IStateService {
    read(): Promise<IState[]>;
}

export const TStateService = new Token<IStateService>();

@Service(TStateService)
export class StateService implements IStateService {
    constructor(
        @Inject(TStateRepository)
        private readonly stateRepository: IStateRepository,
    ) {}

    async read(): Promise<IState[]> {
        return this.stateRepository.find();
    }
}
