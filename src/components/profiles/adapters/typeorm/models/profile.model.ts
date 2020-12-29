import {
    BaseEntity,
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";

import { IProfileDTO } from "@profiles/application/ports/storage";

import { RefreshToken, Role, State } from ".";

// TBD: определиться с неймингом моделей в typeorm и grapql. где с TBD, а где - без.
@Entity("profiles")
export class Profile extends BaseEntity implements IProfileDTO {
    @PrimaryGeneratedColumn()
    id!: number; // TBD: readonly is problem with update through save

    @Column("varchar", { length: 50, nullable: true })
    nickname!: string;

    @Column("varchar", { length: 50 })
    firstName!: string;

    @Column("varchar", { length: 50 })
    lastName!: string;

    @Column("varchar", { length: 14, nullable: true })
    phone!: string;

    @Column("varchar", { length: 50 })
    email!: string;

    @Column("varchar", { length: 20, select: false })
    password!: string;

    @ManyToMany(() => Role)
    @JoinTable({
        name: "profiles_roles_roles",
        joinColumn: {
            name: "profileId",
            referencedColumnName: "id",
        },
        inverseJoinColumn: {
            name: "roleId",
            referencedColumnName: "id",
        },
    })
    roles!: Role[];

    @ManyToOne(() => State, { cascade: false })
    state!: State;

    @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.profile, {
        cascade: true,
    })
    refreshTokens!: RefreshToken[];
}
