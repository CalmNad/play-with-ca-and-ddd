import { Token } from "typedi";

import { IAuthLoginDTO, IAuthInfoDTO } from ".";

export interface IAuthStories {
    login(login: IAuthLoginDTO): Promise<IAuthInfoDTO>;
}

export const TAuthStories = new Token<IAuthStories>();
