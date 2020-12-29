import { IRefreshToken } from "@profiles/domain/entities";

export interface IRefreshTokenDTO
    extends Pick<IRefreshToken, "profileId" | "token" | "lifetime"> {}
