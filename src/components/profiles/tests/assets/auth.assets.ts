import { PROFILE_ROLES } from "@profiles/domain/entities";

import * as faker from "faker";

const db = [
    {
        nickname: faker.internet.userName(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        phone: faker.phone.phoneNumber("(###) ### ####"),
        email: "hr@manager.com",
        password: "123",
        roles: [
            {
                id: PROFILE_ROLES.HR_MANAGER,
            },
        ],
        state: {
            id: 1,
        },
    },
    {
        nickname: faker.internet.userName(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        phone: faker.phone.phoneNumber("(###) ### ####"),
        email: "order@manager.com",
        password: "234",
        roles: [
            {
                id: PROFILE_ROLES.ORDER_MANAGER,
            },
        ],
        state: {
            id: 1,
        },
    },
];

const user = {
    email: db[0].email,
    password: db[0].password,
};

export const assets = { db, user };
