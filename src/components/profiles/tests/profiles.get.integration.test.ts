import { graphqlCall } from "@hr/infrastructure/graphql";

import { PROFILE_STATES } from "@profiles/domain/entities";

import { Profile } from "@profiles/adapters/typeorm/models";

import { assets } from "./assets/profiles.get.assets";

beforeEach(async () => {
    await Profile.delete({});
});

describe("Checking API methods for getting profiles", () => {
    test("HR can get all profiles", async () => {
        // prepare data
        for (let profile of assets.db) {
            await Profile.save(Profile.create(profile));
        }

        // call API
        const profilesAPI = await graphqlCall({
            source: `
                query {
                    profiles {
                        id
                        nickname
                        firstName
                        lastName
                        phone
                        email
                        roles {
                            id
                            name
                        }
                        state {
                            id
                            name
                        }
                    }
                }
            `,
            contextValue: assets.context.HR,
        });

        // get real DB data
        const profilesDB = await Profile.find({
            relations: ["state", "roles"],
        });

        // check response data
        expect(profilesDB).toBeDefined();
        expect(profilesAPI).toMatchObject({
            data: {
                profiles: profilesDB,
            },
        });
    });

    test("Not HR can't get profiles", async () => {
        // prepare data
        for (let profile of assets.db) {
            await Profile.save(Profile.create(profile));
        }

        // call API
        const profilesAPI = await graphqlCall({
            source: `
                query {
                    profiles {
                        id
                        nickname
                        firstName
                        lastName
                        phone
                        email
                        roles {
                            id
                            name
                        }
                        state {
                            id
                            name
                        }
                    }
                }
            `,
            contextValue: assets.context.notHR,
        });

        // get real DB data
        const profilesDB = await Profile.find({
            relations: ["state", "roles"],
        });

        // check response data
        expect(profilesDB).toBeDefined();
        // ?TODO: коды ошибок и т.п. - брать из application/domain
        expect(profilesAPI.errors![0].extensions!.code).toMatch(
            "ERR_APOLLO_NOT_AUTHORISED",
        );
    });

    test("Not authorized user can't get profiles", async () => {
        // prepare data
        for (let profile of assets.db) {
            await Profile.save(Profile.create(profile));
        }

        // call API
        const profilesAPI = await graphqlCall({
            source: `
                query {
                    profiles {
                        id
                        nickname
                        firstName
                        lastName
                        phone
                        email
                        roles {
                            id
                            name
                        }
                        state {
                            id
                            name
                        }
                    }
                }
            `,
            contextValue: assets.context.notUser,
        });

        // get real DB data
        const profilesDB = await Profile.find({
            relations: ["state", "roles"],
        });

        // check response data
        expect(profilesDB).toBeDefined();
        // ?TODO: коды ошибок и т.п. - брать из application/domain
        expect(profilesAPI.errors![0].extensions!.code).toMatch(
            "ERR_APOLLO_NOT_AUTHORISED",
        );
    });

    test("HR can get only some fields of all profiles", async () => {
        // prepare data
        for (let profile of assets.db) {
            await Profile.save(Profile.create(profile));
        }

        // call API
        const profilesAPI = await graphqlCall({
            source: `
                query {
                    profiles {
                        id
                        nickname
                    }
                }
            `,
            contextValue: assets.context.HR,
        });

        // get real DB data
        const profilesDB = await Profile.find({
            select: ["id", "nickname"],
        });

        // check response data
        expect(profilesDB).toBeDefined();
        expect(profilesAPI).toMatchObject({
            data: {
                profiles: profilesDB,
            },
        });
    });

    test("HR can filter the list of profiles by state", async () => {
        // prepare data
        for (let profile of assets.db) {
            await Profile.save(Profile.create(profile));
        }

        // call API
        const profilesAPI = await graphqlCall({
            source: `
                query Register($filter: ProfileFilterDTO) {
                    profiles(filter:$filter) {
                        id
                        nickname
                    }
                }
            `,
            variableValues: {
                filter: {
                    state: {
                        id: PROFILE_STATES.ACTIVE,
                    },
                },
            },
            contextValue: assets.context.HR,
        });

        // get real DB data
        const profilesDB = await Profile.find({
            select: ["id", "nickname"],
            where: {
                state: {
                    id: PROFILE_STATES.ACTIVE,
                },
            },
        });

        // check response data
        expect(profilesDB).toBeDefined();
        expect(profilesAPI).toMatchObject({
            data: {
                profiles: profilesDB,
            },
        });
    });
});
