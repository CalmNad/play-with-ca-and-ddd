import { Token } from "typedi";

import { IRefreshTokenDTO } from ".";

export interface IRefreshTokenStorage {
    create(token: IRefreshTokenDTO): Promise<IRefreshTokenDTO>;
}

export const TRefreshTokenStorage = new Token<IRefreshTokenStorage>();
