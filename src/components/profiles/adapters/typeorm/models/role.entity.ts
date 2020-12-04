import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from "typeorm";

import { IRole } from "@profiles/core";

@Entity("roles")
export class Role extends BaseEntity implements IRole {
    @PrimaryGeneratedColumn()
    readonly id!: number;

    @Column("varchar", { length: 50 })
    name!: string;
}
