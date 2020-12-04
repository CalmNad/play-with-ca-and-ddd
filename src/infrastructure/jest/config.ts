import path = require("path");

module.exports = {
    preset: "ts-jest",
    rootDir: path.resolve(process.cwd()),
    roots: ["<rootDir>/src"],
    testEnvironment: "node",
    globalSetup: "./src/infrastructure/jest/setup-db.ts",
    setupFilesAfterEnv: ["./src/infrastructure/jest/setup-before-after.ts"],
    collectCoverageFrom: ["<rootDir>/src/components/**"],
    moduleNameMapper: {
        "^@hr(.*)$": "<rootDir>/src/$1",
        "^@profiles(.*)$": "<rootDir>/src/components/profiles/$1",
    },
};
