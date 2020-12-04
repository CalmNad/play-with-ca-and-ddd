import { MigrationInterface, QueryRunner } from "typeorm";

export class initStates1606307131804 implements MigrationInterface {
    name = "initStates1606307131804";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "states" (
                "id" SERIAL NOT NULL,
                "name" character varying(50) NOT NULL,
                CONSTRAINT "PK_09ab30ca0975c02656483265f4f" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "states" (
                "id", 
                "name"
            ) 
            VALUES 
                (1, 'active'),
                (2, 'frozen'),
                (3, 'deleted')
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            TRUNCATE TABLE "states" CASCADE
        `);
        await queryRunner.query(`
            DROP TABLE "states"
        `);
    }
}
