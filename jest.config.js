export default {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js", "@testing-library/jest-dom"],
  testEnvironment: "jest-environment-jsdom",
  transformIgnorePatterns: [
    "/node_modules/(?!(lottie-web|react-lottie)/)",
    "/node_modules/",
  ],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^.+\\.(css|sass|scss)$": "jest-transform-stub",
    "^react-lottie$": "<rootDir>/mocks/react-lottie.js",
  },
  transform: {
    "^.+\\.jsx?$": ["babel-jest", { plugins: ["transform-import-meta"] }],
  },
};
