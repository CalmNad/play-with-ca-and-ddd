import { graphqlCall } from "@hr/infrastructure/graphql";

import { Role } from "@profiles/adapters/typeorm/models";

describe("Check API for get profile's roles", () => {
    test("User can get list of all roles", async () => {
        // get real DB data
        const rolesDB = await Role.find({});
        expect(rolesDB).toBeDefined();

        // call API
        const rolesAPI = await graphqlCall({
            source: `
                {
                    roles {
                        id
                        name
                    }
                }
            `,
        });

        // check response data
        expect(rolesAPI).toMatchObject({
            data: {
                roles: rolesDB,
            },
        });
    });
});
