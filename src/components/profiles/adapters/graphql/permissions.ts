import { ApolloError } from "apollo-server";
import { allow, deny, and, rule, shield } from "graphql-shield";

// TBD: по хорошему правила доступа нужно определять на уровне core
// TBD: иначе получается размазывание бизнес знаний
const debug = require("debug")(
    "hr:components:profiles:adapters:graphql:permissions",
);

// TODO: использовать модель AuthInfo с учетом iat, exp, etc.

const isAuthenticated = rule()(async (parent, args, { user }) => {
    // return true;

    const log = debug.extend("isAuthenticated");
    log("isAuthenticated", !!(user && user.roles));

    return !!(user && user.roles);
});

const isHRManager = rule()(async (parent, args, { user }) => {
    // return true;

    const log = debug.extend("isHRManager");

    log("user", user);
    if (!user || !user.roles || !user.roles.length) {
        return false;
    }

    let rs = user.roles.find((role: any) => {
        if (role.id && 1 === role.id) {
            return true;
        }
        return false;
    });
    log("HRRole:", !!rs);

    return !!rs;
});

export const permissions = shield(
    {
        Query: {
            "*": deny,
            me: isAuthenticated,
            profiles: allow, // and(isAuthenticated, isHRManager),
            roles: allow,
            states: allow,
        },
        Mutation: {
            "*": deny,
            //     login: not(isAuthenticated),
            createProfile: and(isAuthenticated, isHRManager),
            updateProfile: and(isAuthenticated, isHRManager),
            updateProfileState: and(isAuthenticated, isHRManager),
        },
    },
    {
        // ?TODO: коды ошибок и т.п. - брать из application/domain
        fallbackError: (error, parent, args, context, info) => {
            const log = debug.extend("fallbackError");
            log("error", error);
            log("parent", parent);
            log("args", args);
            log("context", context);
            log("info", info);
            if (null === error) {
                // unexpected errors
                return new ApolloError(
                    "Not Authorised",
                    "ERR_APOLLO_NOT_AUTHORISED",
                );
            } else if (error instanceof ApolloError) {
                // expected errors
                return error;
            } else if (error instanceof Error) {
                // unexpected errors
                return new ApolloError(
                    "Internal server error",
                    "ERR_APOLLO_INTERNAL_SERVER_ERROR",
                );
            } else {
                // what the hell got thrown
                return new ApolloError(
                    "Something strange is happening",
                    "ERR_APOLLO_STRANGE_INTERNAL_SERVER_ERROR",
                );
            }
        },
    },
);
