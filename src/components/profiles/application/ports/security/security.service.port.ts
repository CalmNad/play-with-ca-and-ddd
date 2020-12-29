import { Token } from "typedi";

import { IAuthInfoDTO } from ".";

// TODO: установить корректные типы
export interface ISecurityService {
    jwtSign(data: any): IAuthInfoDTO;
    // TBD: нужен ли отдельный объект данных из токена
    jwtVerify(token: string): any;
}

export const TSecurityService = new Token<ISecurityService>();
