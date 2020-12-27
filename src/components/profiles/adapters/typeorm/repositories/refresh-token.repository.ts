// import { InjectRepository } from "typeorm-typedi-extensions";
// import { Repository } from "typeorm";
// import { Service } from "typedi";

// const debug = require("debug")(
//     "hr:components:profiles:adapters:typeorm:repositories:refresh-token",
// );

// import {
//     IRefreshTokenDTO,
//     IRefreshTokenRepository,
//     TRefreshTokenRepository,
// } from "@profiles/core";

// import { RefreshToken } from "../models";

// @Service(TRefreshTokenRepository)
// export class RefreshTokenRepository implements IRefreshTokenRepository {
//     constructor(
//         @InjectRepository(RefreshToken)
//         private refreshTokenRepository: Repository<RefreshToken>,
//     ) {}

//     async findOne(where: any): Promise<IRefreshTokenDTO> {
//         return await this.refreshTokenRepository.findOneOrFail(where);
//     }

//     async create(profileId: number, token: string): Promise<IRefreshTokenDTO> {
//         const log = debug.extend("create");

//         let rs = await this.refreshTokenRepository.save(
//             this.refreshTokenRepository.create({ token }),
//         );
//         log("rs:", rs);
//         return rs;
//     }

//     async delete(where: any): Promise<boolean> {
//         const log = debug.extend("delete");

//         try {
//             let rs = this.refreshTokenRepository.delete(where);
//             log("rs", rs);
//             return true;
//         } catch (error) {
//             return false;
//         }
//     }
// }
