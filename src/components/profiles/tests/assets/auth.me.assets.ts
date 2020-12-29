import { PROFILE_ROLES } from "@profiles/domain/entities";

import * as faker from "faker";

const db = {
    dispatcher: {
        nickname: faker.internet.userName(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        phone: faker.phone.phoneNumber("(###) ### ####"),
        email: faker.internet.email(),
        password: faker.internet.password(),
        roles: [
            {
                id: PROFILE_ROLES.DISPATCHER,
            },
        ],
        state: {
            id: 1,
        },
    },
    HR: {
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
        ],
        state: {
            id: 1,
        },
    },
    orderManager: {
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
            id: 1,
        },
    },
};

export const assets = { db };
