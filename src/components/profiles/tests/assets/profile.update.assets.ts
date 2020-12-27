import { PROFILE_ROLES } from "@profiles/domain/entities";

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
                id: PROFILE_ROLES.ORDER_MANAGER,
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
        email: faker.internet.email(),
        password: faker.internet.password(),
        roles: [
            {
                id: PROFILE_ROLES.ORDER_MANAGER,
            },
            {
                id: PROFILE_ROLES.DISPATCHER,
            },
        ],
        state: {
            id: 1,
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

const updProfile = {
    nickname: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    phone: faker.phone.phoneNumber("(###) ### ####"),
    email: faker.internet.email(),
    roles: [
        {
            id: PROFILE_ROLES.HR_MANAGER,
        },
        {
            id: PROFILE_ROLES.DISPATCHER,
        },
    ],
    state: {
        id: 2,
    },
};

export const assets = { db, updProfile, context };
