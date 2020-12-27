import { ConnectionOptions } from "typeorm";
import path = require("path");

require("dotenv").config({
    path: path.resolve(__dirname, `../.env.${process.env.TIER}`),
});

const rootPath = path.resolve(process.cwd());

export const config: ConnectionOptions = {
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: (process.env.POSTGRES_PORT as unknown) as number,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [rootPath + "/src/components/**/*{.entity,.model}{.ts,.js}"],
    migrations: [rootPath + "/migrations/**/*{.ts,.js}"],
    cli: { migrationsDir: "migrations" },
    synchronize: process.env.TYPEORM_SYNCHRONIZE === "true",
    dropSchema: process.env.TYPEORM_DROPSCHEMA === "true",
    migrationsRun: process.env.TYPEORM_MIGRATION === "true",
    logger: "advanced-console",
    logging: process.env.TYPEORM_LOGGING === "true",
    cache: true,
};
