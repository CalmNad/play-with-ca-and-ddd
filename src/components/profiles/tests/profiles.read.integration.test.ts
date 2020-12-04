import { graphqlCall } from "@hr/infrastructure/graphql";

import { Profile } from "@profiles/adapters/typeorm";

import { assetsProfiles } from "./assets";

beforeEach(async () => {
    await Profile.delete({});
});

describe("read profiles", () => {
    it("all data", async () => {
        // prepare data
        for (let profile of assetsProfiles.read.db) {
            await Profile.save(Profile.create(profile));
        }

        // call API
        const profilesAPI = await graphqlCall({
            source: `
                {
                    profiles {
                        id
                        nickname
                        firstName
                        lastName
                        phone
                        email
                        password
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

    it("id and nickname only", async () => {
        // prepare data
        for (let profile of assetsProfiles.read.db) {
            await Profile.save(Profile.create(profile));
        }

        // call API
        const profilesAPI = await graphqlCall({
            source: `
                {
                    profiles {
                        id
                        nickname
                    }
                }
            `,
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
});
