import { Service, Inject } from "typedi";

import {
    IProfileDTO,
    IProfileFilterDTO,
    IProfilesStories,
    TProfilesStories,
} from "../ports/api";
import { IProfileStorage, TProfileStorage } from "../ports/storage";

@Service(TProfilesStories)
export class ProfilesStories implements IProfilesStories {
    constructor(
        @Inject(TProfileStorage)
        private readonly profileStorage: IProfileStorage,
    ) {}

    async get(filter?: IProfileFilterDTO): Promise<IProfileDTO[]> {
        return await this.profileStorage.find(filter);
    }
}
