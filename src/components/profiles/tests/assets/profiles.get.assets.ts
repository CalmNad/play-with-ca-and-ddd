import { PROFILE_ROLES, PROFILE_STATES } from "@profiles/domain/entities";

import * as faker from "faker";

const db = [
    {
        nickname: faker.internet.userName(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        phone: faker.phone.phoneNumber("(###) ### ####"),
        email: faker.internet.email(),
        password: faker.internet.password(),
        roles: [
            {
                id: PROFILE_ROLES.HR_MANAGER,
            },
            {
                id: PROFILE_ROLES.DISPATCHER,
            },
        ],
        state: {
            id: PROFILE_STATES.FROZEN,
        },
    },
    {
        nickname: faker.internet.userName(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        phone: faker.phone.phoneNumber("(###) ### ####"),
        email: faker.internet.email(),
        password: faker.internet.password(),
        roles: [
            {
                id: PROFILE_ROLES.ORDER_MANAGER,
            },
        ],
        state: {
            id: PROFILE_STATES.ACTIVE,
        },
    },
];

const context = {
    HR: {
        user: Object.assign({}, db[0]) as any,
    },
    notHR: {
        user: Object.assign({}, db[1]) as any,
    },
    notUser: {},
};
delete context.HR.user.password;
delete context.notHR.user.password;

export const assets = { db, context };
