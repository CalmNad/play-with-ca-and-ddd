import { graphqlCall } from "@hr/infrastructure/graphql";

import { Profile } from "@profiles/adapters/typeorm/models";

import { assets } from "./assets/profile.update-state.assets";

beforeEach(async () => {
    await Profile.delete({});
});

describe("Check API methods for updating profile's state", () => {
    test("HR can update profile's state", async () => {
        // prepare data
        let existProfile: Profile;
        for (let profile of assets.db) {
            existProfile = await Profile.save(Profile.create(profile));
        }

        // call API
        const profileAPI = await graphqlCall({
            source: `
                mutation Register($id: Float!, $stateId: Float!) {
                    updateProfileState(
                        id:$id
                        stateId:$stateId
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
                stateId: assets.newState,
            },
            contextValue: assets.context.HR,
        });

        // get real DB data
        const profileDB = await Profile.findByIds([existProfile!.id], {
            relations: ["state", "roles"],
        });

        // check response data
        expect(profileDB).toBeDefined();
        expect(profileDB).toHaveLength(1);
        expect(profileAPI).toMatchObject({
            data: {
                updateProfileState: profileDB[0],
            },
        });
    });

    test("Not HR can't update profile's state", async () => {
        // prepare data
        let existProfile: Profile;
        for (let profile of assets.db) {
            existProfile = await Profile.save(Profile.create(profile));
        }

        // call API
        const profileAPI = await graphqlCall({
            source: `
                mutation Register($id: Float!, $stateId: Float!) {
                    updateProfileState(
                        id:$id
                        stateId:$stateId
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
                stateId: assets.newState,
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

    test("Not authorized user can't update profile's state", async () => {
        // prepare data
        let existProfile: Profile;
        for (let profile of assets.db) {
            existProfile = await Profile.save(Profile.create(profile));
        }

        // call API
        const profileAPI = await graphqlCall({
            source: `
                mutation Register($id: Float!, $stateId: Float!) {
                    updateProfileState(
                        id:$id
                        stateId:$stateId
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
                stateId: assets.newState,
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
