import {
    BaseEntity,
    Entity,
    Column,
    PrimaryColumn,
    ManyToOne,
    // JoinColumn,
} from "typeorm";

import { IRefreshTokenDTO } from "@profiles/application/ports/storage";

import { Profile } from ".";

@Entity("refresh_tokens")
export class RefreshToken extends BaseEntity implements IRefreshTokenDTO {
    @PrimaryColumn("uuid", { unique: true })
    token!: string;

    @Column("timestamp")
    lifetime!: Date;

    @Column({ type: "integer", name: "profileId" })
    profileId!: number;

    @ManyToOne(() => Profile, (profile) => profile.refreshTokens)
    // @JoinColumn({ name: "profileId" })
    profile!: Profile;
}
