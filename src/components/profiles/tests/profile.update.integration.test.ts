import { graphqlCall } from "@hr/infrastructure/graphql";

import { Profile } from "@profiles/adapters/typeorm/models";

import { assets } from "./assets/profile.update.assets";

const debug = require("debug")("hr:profiles:profile.update.integration.test");

beforeEach(async () => {
    await Profile.delete({});
});

describe("Check API methods for updating profile", () => {
    test("HR can update exists profile", async () => {
        const log = debug.extend("HR can create new profile");

        // prepare data
        let existProfile: Profile;
        for (let profile of assets.db) {
            existProfile = await Profile.save(Profile.create(profile));
        }

        // call API
        const profileAPI = await graphqlCall({
            source: `
                mutation Register($id: Float!, $data: ProfileUpdateDTO!) {
                    updateProfile(
                        id:$id
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
                id: existProfile!.id,
                data: assets.updProfile,
            },
            contextValue: assets.context.HR,
        });
        log("profileAPI", profileAPI);

        // get real DB data
        const profileDB = await Profile.findByIds([existProfile!.id], {
            relations: ["state", "roles"],
        });

        // check response data
        expect(profileDB).toBeDefined();
        expect(profileDB).toHaveLength(1);
        expect(profileAPI).toMatchObject({
            data: {
                updateProfile: profileDB[0],
            },
        });
    });

    test("Not HR can't create new profile", async () => {
        // prepare data
        let existProfile: Profile;
        for (let profile of assets.db) {
            existProfile = await Profile.save(Profile.create(profile));
        }

        // call API
        const profileAPI = await graphqlCall({
            source: `
                mutation Register($id: Float!, $data: ProfileUpdateDTO!) {
                    updateProfile(
                        id:$id
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
                id: existProfile!.id,
                data: assets.updProfile,
            },
            contextValue: assets.context.notHR,
        });

        // get real DB data
        const profileDB = await Profile.findByIds([existProfile!.id], {
            relations: ["state", "roles"],
        });

        // check response data
        expect(profileDB).toBeDefined();
        expect(profileDB).toHaveLength(1);
        // ?TODO: коды ошибок и т.п. - брать из application/domain
        expect(profileAPI.errors![0].extensions!.code).toMatch(
            "ERR_APOLLO_NOT_AUTHORISED",
        );
    });

    test("Not authorized user can't create new profile", async () => {
        // prepare data
        let existProfile: Profile;
        for (let profile of assets.db) {
            existProfile = await Profile.save(Profile.create(profile));
        }

        // call API
        const profileAPI = await graphqlCall({
            source: `
                mutation Register($id: Float!, $data: ProfileUpdateDTO!) {
                    updateProfile(
                        id:$id
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
                id: existProfile!.id,
                data: assets.updProfile,
            },
            contextValue: assets.context.notUser,
        });

        // get real DB data
        const profileDB = await Profile.findByIds([existProfile!.id], {
            relations: ["state", "roles"],
        });

        // check response data
        expect(profileDB).toBeDefined();
        expect(profileDB).toHaveLength(1);
        // ?TODO: коды ошибок и т.п. - брать из application/domain
        expect(profileAPI.errors![0].extensions!.code).toMatch(
            "ERR_APOLLO_NOT_AUTHORISED",
        );
    });
});
