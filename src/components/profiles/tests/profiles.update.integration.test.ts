import { graphqlCall } from "@hr/infrastructure/graphql";

import { Profile } from "@profiles/adapters/typeorm";

import { assetsProfiles } from "./assets";

beforeEach(async () => {
    await Profile.delete({});
});

describe("update profiles", () => {
    it("update all data", async () => {
        // prepare data
        let existProfile: Profile;
        for (let profile of assetsProfiles.update.db) {
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
                data: assetsProfiles.update.updProfile,
            },
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
                updateProfile: profileDB[0],
            },
        });
    });
});
