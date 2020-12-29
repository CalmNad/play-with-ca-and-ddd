const jwt = require("jsonwebtoken");
import { v4 as uuidv4 } from "uuid";
import { Service } from "typedi";

import {
    IAuthInfoDTO,
    ISecurityService,
    TSecurityService,
} from "@profiles/application/ports/security";

class AuthInfo implements IAuthInfoDTO {
    accessToken!: string;
    refreshToken!: string;
}

@Service(TSecurityService)
export class SecurityService implements ISecurityService {
    jwtSign(data: any): IAuthInfoDTO {
        let authInfo = new AuthInfo();
        authInfo.accessToken = jwt.sign(data, process.env.JWT_SECRET, {
            expiresIn: "15m",
            algorithm: "HS256",
        });
        authInfo.refreshToken = uuidv4();

        return authInfo;
    }

    jwtVerify(token: string): Promise<any> {
        console.log(":", token);
        return "" as any;
    }
}
