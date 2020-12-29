// import { IProfile } from "@hr/components/profiles/domain/entities";
import { Token } from "typedi";

// import { IProfileDTO } from ".";

export interface IAuthStorage {
    // findProfile(filter: IProfileAuthDTO): Promise<IProfileDTO>;
    addRefreshToken(profileId: number, refreshToken: string): Promise<Boolean>;
    deleteRefreshToken(
        profileId: number,
        refreshToken: string,
    ): Promise<Boolean>;

    // find(filter?: IProfileFilterDTO): Promise<IProfileDTO[]>;
    // findOne(filter?: IProfileFilterDTO): Promise<IProfileDTO>;
    // create(profileData: IProfileCreateDTO): Promise<IProfileDTO>;
    // update(
    //     profileId: number,
    //     profileData: IProfileUpdateDTO,
    // ): Promise<IProfileDTO>;
}

export const TAuthStorage = new Token<IAuthStorage>();
