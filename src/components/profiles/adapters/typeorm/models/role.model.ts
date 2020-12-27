import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from "typeorm";

import { IRoleDTO } from "@profiles/application/ports/storage";

@Entity("roles")
export class Role extends BaseEntity implements IRoleDTO {
    @PrimaryGeneratedColumn()
    readonly id!: number;

    @Column("varchar", { length: 50 })
    name!: string;
}
