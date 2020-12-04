import { graphqlCall } from "@hr/infrastructure/graphql";

import { State } from "@profiles/adapters/typeorm";

describe("read profile's states", () => {
    it("all data", async () => {
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
