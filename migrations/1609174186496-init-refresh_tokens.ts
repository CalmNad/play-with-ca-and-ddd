import { MigrationInterface, QueryRunner } from "typeorm";

export class initRefreshToken1609174186496 implements MigrationInterface {
    name = "initRefreshToken1609174186496";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "refresh_tokens" (
                "token" uuid NOT NULL,
                "lifetime" TIMESTAMP NOT NULL,
                "profileId" integer NOT NULL,
                CONSTRAINT "PK_4542dd2f38a61354a040ba9fd57" PRIMARY KEY ("token"),
                CONSTRAINT "FK_5d06ed805e3d53b2cbfdb54c4b7" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "refresh_tokens"
        `);
    }
}
