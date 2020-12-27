import { graphqlCall } from "@hr/infrastructure/graphql";

import { State } from "@profiles/adapters/typeorm/models";

describe("Check API for get profile's states", () => {
    test("User can get list of all states", async () => {
        // get real DB data
        const statesDB = await State.find({});
        expect(statesDB).toBeDefined();

        // call API
        const statesAPI = await graphqlCall({
            source: `
                {
                    states {
                        id
                        name
                    }
                }
            `,
        });

        // check API data
        expect(statesAPI).toMatchObject({
            data: {
                states: statesDB,
            },
        });
    });
});
