import { graphqlCall } from "@hr/infrastructure/graphql";

import { Profile } from "@profiles/adapters/typeorm/models";

import { assets } from "./assets/profile.create.assets";

const debug = require("debug")("hr:profiles:profile.create.integration.test");

beforeEach(async () => {
    await Profile.delete({});
});

describe("Check API methods for creating new profile", () => {
    test("HR can create new profile", async () => {
        const log = debug.extend("HR can create new profile");

        // call API
        const profileAPI = await graphqlCall({
            source: `
                mutation Register($data: ProfileCreateDTO!) {
                    createProfile(
                        data:$data
                    ) {
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
            variableValues: {
                data: assets.newProfile,
            },
            contextValue: assets.context.HR,
        });
        log("profileAPI", profileAPI);

        // get real DB data
        const profileDB = await Profile.find({
            where: {
                nickname: assets.newProfile.nickname,
            },
            relations: ["state", "roles"],
        });

        // check response data
        expect(profileDB).toBeDefined();
        expect(profileDB).toHaveLength(1);
        expect(profileAPI).toMatchObject({
            data: {
                createProfile: profileDB[0],
            },
        });
    });

    test("Not HR can't create new profile", async () => {
        const log = debug.extend("Not HR can't create new profile");

        // call API
        const profileAPI = await graphqlCall({
            source: `
                mutation Register($data: ProfileCreateDTO!) {
                    createProfile(
                        data:$data
                    ) {
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
            variableValues: {
                data: assets.newProfile,
            },
            contextValue: assets.context.notHR,
        });
        log("profileAPI", profileAPI);

        // get real DB data
        const profileDB = await Profile.find({
            where: {
                nickname: assets.newProfile.nickname,
            },
            relations: ["state", "roles"],
        });

        // check response data
        expect(profileDB).toBeDefined();
        expect(profileDB).toHaveLength(0);
        // ?TODO: коды ошибок и т.п. - брать из application/domain
        expect(profileAPI.errors![0].extensions!.code).toMatch(
            "ERR_APOLLO_NOT_AUTHORISED",
        );
    });

    test("Not authorized user can't create new profile", async () => {
        const log = debug.extend(
            "Not authorized user can't create new profile",
        );

        // call API
        const profileAPI = await graphqlCall({
            source: `
                mutation Register($data: ProfileCreateDTO!) {
                    createProfile(
                        data:$data
                    ) {
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
            variableValues: {
                data: assets.newProfile,
            },
            contextValue: assets.context.notUser,
        });
        log("profileAPI", profileAPI);

        // get real DB data
        const profileDB = await Profile.find({
            where: {
                nickname: assets.newProfile.nickname,
            },
            relations: ["state", "roles"],
        });

        // check response data
        expect(profileDB).toBeDefined();
        expect(profileDB).toHaveLength(0);
        // ?TODO: коды ошибок и т.п. - брать из application/domain
        expect(profileAPI.errors![0].extensions!.code).toMatch(
            "ERR_APOLLO_NOT_AUTHORISED",
        );
    });
});
