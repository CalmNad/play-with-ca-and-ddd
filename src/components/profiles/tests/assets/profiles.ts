import * as faker from "faker";

export const assetsProfiles = {
    read: {
        db: [
            {
                nickname: faker.internet.userName(),
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                phone: faker.phone.phoneNumber("(###) ### ####"),
                email: faker.internet.email(),
                password: faker.internet.password(),
                roles: [
                    {
                        id: 1,
                    },
                    {
                        id: 3,
                    },
                ],
                state: {
                    id: 2,
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
                        id: 2,
                    },
                ],
                state: {
                    id: 1,
                },
            },
        ],
    },
    create: {
        newProfile: {
            nickname: faker.internet.userName(),
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            phone: faker.phone.phoneNumber("(###) ### ####"),
            email: faker.internet.email(),
            roles: [
                {
                    id: 1,
                },
                {
                    id: 2,
                },
            ],
            state: {
                id: 1,
            },
        },
    },
    update: {
        db: [
            {
                nickname: faker.internet.userName(),
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                phone: faker.phone.phoneNumber("(###) ### ####"),
                email: faker.internet.email(),
                password: faker.internet.password(),
                roles: [
                    {
                        id: 1,
                    },
                    {
                        id: 2,
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
                        id: 2,
                    },
                    {
                        id: 3,
                    },
                ],
                state: {
                    id: 1,
                },
            },
        ],
        updProfile: {
            nickname: faker.internet.userName(),
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            phone: faker.phone.phoneNumber("(###) ### ####"),
            email: faker.internet.email(),
            roles: [
                {
                    id: 1,
                },
                {
                    id: 3,
                },
            ],
            state: {
                id: 2,
            },
        },
    },
    updateState: {
        db: [
            {
                nickname: faker.internet.userName(),
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                phone: faker.phone.phoneNumber("(###) ### ####"),
                email: faker.internet.email(),
                password: faker.internet.password(),
                roles: [
                    {
                        id: 1,
                    },
                    {
                        id: 2,
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
                        id: 2,
                    },
                    {
                        id: 3,
                    },
                ],
                state: {
                    id: 1,
                },
            },
        ],
        newState: 3,
    },
};
