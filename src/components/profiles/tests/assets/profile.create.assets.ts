import { PROFILE_ROLES } from "@profiles/domain/entities";

import * as faker from "faker";

const newProfile = {
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
            id: PROFILE_ROLES.ORDER_MANAGER,
        },
    ],
    state: {
        id: 1,
    },
};

const context = {
    HR: {
        user: {
            nickname: faker.internet.userName(),
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            phone: faker.phone.phoneNumber("(###) ### ####"),
            email: faker.internet.email(),
            roles: [
                {
                    id: PROFILE_ROLES.DISPATCHER,
                },
                {
                    id: PROFILE_ROLES.HR_MANAGER,
                },
                {
                    id: PROFILE_ROLES.ORDER_MANAGER,
                },
            ],
            state: {
                id: 2,
            },
        },
    },
    notHR: {
        user: {
            nickname: faker.internet.userName(),
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            phone: faker.phone.phoneNumber("(###) ### ####"),
            email: faker.internet.email(),
            roles: [
                {
                    id: PROFILE_ROLES.ORDER_MANAGER,
                },
                {
                    id: PROFILE_ROLES.DISPATCHER,
                },
            ],
            state: {
                id: 2,
            },
        },
    },
    notUser: {},
};

export const assets = { newProfile, context };
