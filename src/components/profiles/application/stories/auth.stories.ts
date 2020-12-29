// TBD: возможно сюда стоит переместить и "me"

import { Service, Inject } from "typedi";

import {
    IAuthLoginDTO,
    IAuthInfoDTO,
    IAuthStories,
    TAuthStories,
} from "../ports/api";
import {
    IProfileStorage,
    TProfileStorage,
    IRefreshTokenStorage,
    TRefreshTokenStorage,
} from "../ports/storage";
import { ISecurityService, TSecurityService } from "../ports/security";

import { Profile } from "@profiles/domain/entities";

export class CoreError extends Error {
    public code: string | number | null;

    constructor(code: string | null = null, message: string = "") {
        super(message);
        this.code = code;
        // Ensure the name of this error is the same as the class name
        this.name = this.constructor.name;
        // This clips the constructor invocation from the stack trace.
        // It's not absolutely essential, but it does make the stack trace a little nicer.
        //  @see Node.js reference (bottom)
        Error.captureStackTrace(this, this.constructor);
    }
}

export class AuthError extends CoreError {
    constructor(code: string | null = null, message: string = "") {
        super(code, message);
        // Ensure the name of this error is the same as the class name
        this.name = this.constructor.name;
    }
}

@Service(TAuthStories)
export class AuthStories implements IAuthStories {
    constructor(
        @Inject(TProfileStorage)
        private readonly profileStorage: IProfileStorage,
        @Inject(TSecurityService)
        private readonly securityService: ISecurityService,
        @Inject(TRefreshTokenStorage)
        private readonly refreshTokenStorage: IRefreshTokenStorage,
    ) {}

    async login(login: IAuthLoginDTO): Promise<IAuthInfoDTO> {
        let profile: Profile;
        try {
            profile = new Profile(await this.profileStorage.findOne(login));
        } catch (error) {
            // TODO: add error exception: нет такого пользователя
            throw new AuthError(
                "AUTH_WRONG_USER_OR_PASSWORD",
                "Wrong user or password!",
            );
        }

        let jwt = this.securityService.jwtSign({
            id: profile.id,
            nickname: profile.nickname,
            firstName: profile.firstName,
            lastName: profile.lastName,
            roles: profile.roles,
            state: profile.state,
        });

        // TODO: вынести время жизни refresh token в настройки
        await this.refreshTokenStorage.create({
            profileId: profile.id,
            token: jwt.refreshToken,
            lifetime: new Date(new Date().getTime() + 1000 * 60 * 60 * 24),
        });

        return jwt;
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
