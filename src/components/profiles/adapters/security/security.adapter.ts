// const jwt = require("jsonwebtoken");
// import { v4 as uuidv4 } from "uuid";
// import { Service } from "typedi";

// import { IAuthInfo, ISecurityService, TSecurityService } from "@profiles/core";

// class AuthInfo implements IAuthInfo {
//     accessToken!: string;
//     refreshToken!: string;
// }

// @Service(TSecurityService)
// export class SecurityService implements ISecurityService {
//     jwtSign(data: any): IAuthInfo {
//         let authInfo = new AuthInfo();
//         authInfo.accessToken = jwt.sign(data, process.env.JWT_SECRET, {
//             expiresIn: "15m",
//             algorithm: "HS256",
//         });
//         authInfo.refreshToken = uuidv4();

//         return authInfo;
//     }

//     jwtVerify(token: string): Promise<any> {
//         console.log(":", token);
//         return "" as any;
//     }
// }
