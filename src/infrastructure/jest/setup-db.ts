// tslint:disable-next-line: no-var-requires
require("ts-node/register");
// tslint:disable-next-line: no-var-requires
require("tsconfig-paths/register");

import "reflect-metadata";
process.env.TIER = "test";

import { createConnection } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
// FIXME: разобраться, почему при ипользовании @hr/infrastructure/typeorm все "радостно ругается"
import { config } from "@hr/infrastructure/typeorm/ormconfig";

export default async () => {
    // Force dropping the schema so that test run clean every time.
    // Note that we are not cleaning *between* tests.
    const testOrmConfig: PostgresConnectionOptions = {
        ...(config as PostgresConnectionOptions),
        dropSchema: true,
        migrationsRun: true,
    };

    const connection = await createConnection(testOrmConfig);

    // const t0 = Date.now();
    // const connection = await createConnection(testOrmConfig);
    // const connectTime = Date.now();
    // await connection.runMigrations();
    // const migrationTime = Date.now();
    // console.log(
    //     `Connected in ${connectTime - t0}ms - Executed migrations in ${
    //         migrationTime - connectTime
    //     }ms.`,
    // );
    await connection.close();
};
