import { graphqlCall } from "@hr/infrastructure/graphql";

import { Profile as ProfileORM } from "@profiles/adapters/typeorm/models";

import { assets } from "./assets/auth.assets";
import { assets as assetsMe } from "./assets/auth.me.assets";
// import { issueToken } from "./helpers";

const debug = require("debug")("hr:profiles:tests:auth.integration.test");

beforeEach(async () => {
    await ProfileORM.delete({});
});

describe("AAA", () => {
    test("User can succesfully login", async () => {
        const log = debug.extend("User can succesfully login");

        // prepare data
        for (let profile of assets.db) {
            await ProfileORM.save(ProfileORM.create(profile));
        }

        // call API
        const authInfo = await graphqlCall({
            source: `
                mutation Register($data: AuthLoginDTO!) {
                    login(data:$data) {
                        accessToken
                        refreshToken
                    }
                }
            `,
            variableValues: {
                data: {
                    email: assets.user.email,
                    password: assets.user.password,
                },
            },
        });
        log(authInfo);

        // get real DB data
        const profileDB = await ProfileORM.find({
            where: {
                email: assets.user.email,
                password: assets.user.password,
            },
            relations: ["state", "roles", "refreshTokens"],
        });
        log("profileDB:", profileDB);

        // check response data
        expect(typeof authInfo.data!.login.accessToken).toBe("string");
        expect(authInfo.data!.login.accessToken).not.toBe("");
        expect(authInfo.data!.login.refreshToken).toMatch(
            profileDB[0].refreshTokens[0].token,
        );
    });

    // test("User gets 'AUTH_WRONG_USER_OR_PASSWORD' on invalid credentials", async () => {
    //     const log = debug.extend(
    //         "user gets 'AUTH_WRONG_USER_OR_PASSWORD' on invalid credentials",
    //     );

    //     // prepare data
    //     for (let profile of assets.db) {
    //         await ProfileORM.save(ProfileORM.create(profile));
    //     }

    //     // call API
    //     const authInfo = await graphqlCall({
    //         source: `
    //             mutation Register($email: String!, $password: String!) {
    //                 login(email:$email, password:$password) {
    //                     accessToken
    //                     refreshToken
    //                 }
    //             }
    //         `,
    //         variableValues: {
    //             email: "INVALID",
    //             password: "INVALID",
    //         },
    //     });
    //     log(authInfo);

    //     // check response data
    //     expect(authInfo.errors).toHaveLength(1);
    //     expect(authInfo.errors![0].extensions!.code).toBe(
    //         "AUTH_WRONG_USER_OR_PASSWORD",
    //     );
    // });

    test.todo(
        "User receives 401 on expired token. TODO: move test into gateway",
    );

    // test.todo("User can get new access token using refresh token", async () => {
    //     const log = debug.extend(
    //         "user can get new access token using refresh token",
    //     );

    //     // prepare data
    //     for (let profile of assets.db) {
    //         await ProfileORM.save(ProfileORM.create(profile));
    //         // if (profile.accessT)
    //     }

    //     // call API
    //     const authInfo = await graphqlCall({
    //         source: `
    //             mutation Register($email: String!, $password: String!) {
    //                 login(email:$email, password:$password) {
    //                     accessToken
    //                     refreshToken
    //                 }
    //             }
    //         `,
    //         variableValues: {
    //             email: assets.user.email,
    //             password: assets.user.password,
    //         },
    //     });
    //     log(authInfo);

    //     // check response data
    //     expect(typeof authInfo.data!.login.accessToken).toBe("string");
    //     expect(authInfo.data!.login.accessToken).not.toBe("");
    //     expect(typeof authInfo.data!.login.refreshToken).toBe("string");
    //     expect(authInfo.data!.login.refreshToken).not.toBe("");
    // });
    test.todo("User can use refresh token only once");
    test.todo("Refresh tokens become invalid on logout");
    test.todo("Multiple refresh tokens are valid");

    test("HR can read his own profile data", async () => {
        // prepare data
        let profileDB: any = await ProfileORM.save(
            ProfileORM.create(assetsMe.db.HR),
        );
        delete profileDB.password;
        await ProfileORM.save(ProfileORM.create(assetsMe.db.dispatcher));
        await ProfileORM.save(ProfileORM.create(assetsMe.db.orderManager));

        // call API
        const profileAPI = await graphqlCall({
            source: `
                query {
                    me {
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
            contextValue: {
                user: profileDB,
            },
        });

        // check response data
        expect(profileDB).toBeDefined();
        expect(profileAPI).toMatchObject({
            data: {
                me: profileDB,
            },
        });
    });

    test("Dispatcher can read his own profile data", async () => {
        // prepare data
        let profileDB: any = await ProfileORM.save(
            ProfileORM.create(assetsMe.db.dispatcher),
        );
        delete profileDB.password;
        await ProfileORM.save(ProfileORM.create(assetsMe.db.orderManager));
        await ProfileORM.save(ProfileORM.create(assetsMe.db.HR));

        // call API
        const profileAPI = await graphqlCall({
            source: `
                query {
                    me {
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
            contextValue: {
                user: profileDB,
            },
        });

        // check response data
        expect(profileDB).toBeDefined();
        expect(profileAPI).toMatchObject({
            data: {
                me: profileDB,
            },
        });
    });

    test("Order manager can read his own profile data", async () => {
        // prepare data
        let profileDB: any = await ProfileORM.save(
            ProfileORM.create(assetsMe.db.orderManager),
        );
        delete profileDB.password;
        await ProfileORM.save(ProfileORM.create(assetsMe.db.HR));
        await ProfileORM.save(ProfileORM.create(assetsMe.db.dispatcher));

        // call API
        const profileAPI = await graphqlCall({
            source: `
                query {
                    me {
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
            contextValue: {
                user: profileDB,
            },
        });

        // check response data
        expect(profileDB).toBeDefined();
        expect(profileAPI).toMatchObject({
            data: {
                me: profileDB,
            },
        });
    });
});
