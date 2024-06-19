// jest.config.mjs
export default {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.module\\.css$': 'identity-obj-proxy',
    '\\.css$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.css$': 'jest-css-modules-transform',
  },
  moduleFileExtensions: ['js', 'jsx'],
  setupFilesAfterEnv: ['./jest.setup.js'],
  setupFiles: ['jest-canvas-mock'],
  transformIgnorePatterns: [
    'node_modules/(?!(@mui|other-module)/)',
  ],
};