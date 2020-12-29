import { MigrationInterface, QueryRunner } from "typeorm";

export class initProfiles1606316271657 implements MigrationInterface {
    name = "initProfiles1606316271657";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "profiles" (
                "id" SERIAL NOT NULL,
                "nickname" character varying(50),
                "firstName" character varying(50) NOT NULL,
                "lastName" character varying(50) NOT NULL,
                "phone" character varying(14),
                "email" character varying(50) NOT NULL,
                "password" character varying(20) NOT NULL,
                "stateId" integer,
                CONSTRAINT "PK_8e520eb4da7dc01d0e190447c8e" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "profiles_roles_roles" (
                "profileId" integer NOT NULL,
                "roleId" integer NOT NULL,
                CONSTRAINT "PK_4df0e6db4d73095e0d275a9cc57" PRIMARY KEY ("profileId", "roleId")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_ff9b6a8793af3f4d509c7c7e5a" ON "profiles_roles_roles" ("profileId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_2b7c25049b9ca9e7e3a9468662" ON "profiles_roles_roles" ("roleId")
        `);
        await queryRunner.query(`
            ALTER TABLE "profiles"
            ADD CONSTRAINT "FK_ac57d21bcbec32ca1cac98c2c2f" FOREIGN KEY ("stateId") REFERENCES "states"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "profiles_roles_roles"
            ADD CONSTRAINT "FK_ff9b6a8793af3f4d509c7c7e5a4" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "profiles_roles_roles"
            ADD CONSTRAINT "FK_2b7c25049b9ca9e7e3a94686620" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            INSERT INTO "profiles" (
                "nickname",
                "firstName",
                "lastName",
                "email",
                "password",
                "stateId"
            ) 
            VALUES (
                'admin',
                'admin',
                'admin',
                'admin@unclesamcarrier.com',
                'admin',
                1
            )
        `);
        await queryRunner.query(`
            INSERT INTO "profiles_roles_roles" (
                "profileId",
                "roleId"
            ) 
            VALUES (
                (SELECT id FROM "profiles" WHERE email='admin@unclesamcarrier.com' LIMIT 1),
                1
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            TRUNCATE TABLE "profiles_roles_roles" CASCADE
        `);
        await queryRunner.query(`
            TRUNCATE TABLE "profiles" CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "profiles_roles_roles" DROP CONSTRAINT "FK_2b7c25049b9ca9e7e3a94686620"
        `);
        await queryRunner.query(`
            ALTER TABLE "profiles_roles_roles" DROP CONSTRAINT "FK_ff9b6a8793af3f4d509c7c7e5a4"
        `);
        await queryRunner.query(`
            ALTER TABLE "profiles" DROP CONSTRAINT "FK_ac57d21bcbec32ca1cac98c2c2f"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_2b7c25049b9ca9e7e3a9468662"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_ff9b6a8793af3f4d509c7c7e5a"
        `);
        await queryRunner.query(`
            DROP TABLE "profiles_roles_roles"
        `);
        await queryRunner.query(`
            DROP TABLE "profiles"
        `);
    }
}
