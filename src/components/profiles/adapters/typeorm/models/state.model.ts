import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from "typeorm";

import { IStateDTO } from "@profiles/application/ports/storage";

@Entity("states")
export class State extends BaseEntity implements IStateDTO {
    @PrimaryGeneratedColumn()
    readonly id!: number;

    @Column("varchar", { length: 50 })
    name!: string;
}
