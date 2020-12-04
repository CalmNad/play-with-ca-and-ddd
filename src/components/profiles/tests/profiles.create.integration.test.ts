import { graphqlCall } from "@hr/infrastructure/graphql";

import { Profile } from "@profiles/adapters/typeorm";

import { assetsProfiles } from "./assets";

beforeEach(async () => {
    await Profile.delete({});
});

describe("create profiles", () => {
    it("correct data", async () => {
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
                data: assetsProfiles.create.newProfile,
            },
        });

        // get real DB data
        const profileDB = await Profile.find({
            where: {
                nickname: assetsProfiles.create.newProfile.nickname,
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
});
