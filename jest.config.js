module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  transform: {
    "^.+\\.(js|ts)$": "babel-jest",
  },
  setupFiles: ['<rootDir>/src/test-setup.js'],
  transformIgnorePatterns: [],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^axios$": "axios/dist/axios.js",
  },
};
