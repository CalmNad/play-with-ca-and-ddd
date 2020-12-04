import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from "typeorm";

import { IState } from "@profiles/core";

@Entity("states")
export class State extends BaseEntity implements IState {
    @PrimaryGeneratedColumn()
    readonly id!: number;

    @Column("varchar", { length: 50 })
    name!: string;
}
