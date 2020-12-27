import { MigrationInterface, QueryRunner } from "typeorm";

export class initRoles1606306970584 implements MigrationInterface {
    name = "initRoles1606306970584";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "roles" (
                "id" SERIAL NOT NULL,
                "name" character varying(50) NOT NULL,
                CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "roles" (
                "id", 
                "name"
            ) 
            VALUES 
                (1, 'HR manager'),
                (2, 'Order manager'),
                (3, 'Dispatcher')
        `);
    }

    // TODO: заюзать PROFILE_ROLES из core role.entity, и такое же для states
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            TRUNCATE TABLE "roles" CASCADE
        `);
        await queryRunner.query(`
            DROP TABLE "roles"
        `);
    }
}
