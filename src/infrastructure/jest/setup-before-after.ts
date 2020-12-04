import { Container } from "typedi";
import { createConnection, getConnection, useContainer } from "typeorm";

import { config } from "@hr/infrastructure/typeorm/ormconfig";

// TODO: обдумать вариант использования name: default в ormconfig и отключения флагов работы с миграциями, схемой и т.д.
beforeAll(async () => {
    useContainer(Container);
    await createConnection(config);
});

afterAll(async () => {
    await getConnection().close();
});
