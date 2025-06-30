const nextJest = require("next/jest");

/** @type {import('jest').Config} */
const createJestConfig = nextJest({
    // Provide the path to your Next.js app to load next.config.js and .env files
    dir: "./",
});

// Add any custom config to be passed to Jest
const config = {
    coverageProvider: "v8",
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/$1",
    },
    testPathIgnorePatterns: [
        "<rootDir>/.next/",
        "<rootDir>/node_modules/",
        "<rootDir>/tests-examples/",
        "<rootDir>/tests/",
    ],
    collectCoverageFrom: [
        "lib/challengeStore.ts",
        "lib/questionManager.ts",
        "lib/progressStore.ts",
        "lib/achievementsStore.ts",
        "lib/leaderboardStore.ts",
        "!**/*.d.ts",
        "!**/node_modules/**",
    ],
    coverageThreshold: {
        global: {
            branches: 60,
            functions: 20,
            lines: 60,
            statements: 60,
        },
    },
    coverageReporters: ["text", "lcov", "json-summary", "html"],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(config);
