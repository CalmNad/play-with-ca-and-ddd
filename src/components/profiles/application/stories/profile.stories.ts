import { Service, Inject } from "typedi";

import {
    IProfileDTO,
    IProfileCreateDTO,
    IProfileFilterDTO,
    IProfileUpdateDTO,
    IProfileStories,
    TProfileStories,
} from "../ports/api";
import { IProfileStorage, TProfileStorage } from "../ports/storage";

import { Profile } from "@profiles/domain/entities";

@Service(TProfileStories)
export class ProfileStories implements IProfileStories {
    constructor(
        @Inject(TProfileStorage)
        private readonly profileStorage: IProfileStorage,
    ) {}

    // TODO: скорее всего в каждый метод с уровня адаптера api надо передавать context (содержит как минимум сессию)
    async get(filter?: IProfileFilterDTO): Promise<IProfileDTO> {
        return await this.profileStorage.findOne(filter);
    }

    async create(profileData: IProfileCreateDTO): Promise<IProfileDTO> {
        const profile = new Profile(profileData);
        profile.generateNewPassword();
        // TBD: ?надо ли тут добавлять что-то вроде: ...create(profile.toStorageCreateDTO())
        return await this.profileStorage.create(profile);
    }

    async update(
        profileId: number,
        profileData: IProfileUpdateDTO,
    ): Promise<IProfileDTO> {
        return await this.profileStorage.update(profileId, profileData);
    }

    async updateState(
        profileId: number,
        stateId: number,
    ): Promise<IProfileDTO> {
        return await this.profileStorage.update(profileId, {
            state: {
                id: stateId,
            },
        } as IProfileUpdateDTO);
    }

    // async me(user: any): Promise<IProfileDTO> {
    //     const log = debug.extend("login");
    //     try {
    //         const rs = await this.profileRepository.findOne({ id: user.id });
    //         log("me:", rs);
    //         return rs;
    //     } catch (error) {
    //         throw new Error("wrong internal data");
    //     }
    // }
    // async login(email: string, password: string): Promise<IAuthInfo> {
    //     const log = debug.extend("login");
    //     log("try auth:", email, password);
    //     let profile: Profile;
    //     try {
    //         profile = new Profile(
    //             await this.profileRepository.findOne({
    //                 email: email,
    //                 password: password,
    //             }),
    //         );
    //     } catch (error) {
    //         // TODO: add error exception: нет такого пользователя
    //         throw new AuthError(
    //             "AUTH_WRONG_USER_OR_PASSWORD",
    //             "Wrong user or password!",
    //         );
    //     }
    //     return profile.generateJWT();
    // }
    // async refresh(token: string): Promise<IAuthInfo> {
    //     const log = debug.extend("refresh");
    //     log("try refresh JOT:", token);
    //     try {
    //         return Profile.refreshJWT(token);
    //     } catch (error) {
    //         throw new AuthError(
    //             "AUTH_WRONG_REFRESH_TOKEN",
    //             "Wrong refersh token!",
    //         );
    //     }
    // }
}
