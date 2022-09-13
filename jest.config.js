module.exports = {
    testPathIgnorePatterns: ["/node_module", "/.next/"],
    setupFilesAfterEnv: [
        "<rootDir>/src/tests/setupTests.ts"
    ],
    transform: {
        "^.+\\.(js|tsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest"
    },
    moduleNameMapper: {
        "\\.(scss|css|sass)$": "identity-obj-proxy" 
    },
    testEnvironment: 'jsdom'
}