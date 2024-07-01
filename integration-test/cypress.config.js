const path = require("path");
const fs = require("fs-extra");
const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const createEsbuildPlugin = require("@bahmutov/cypress-esbuild-preprocessor/esbuild");

const addCucumberPreprocessorPlugin = require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;

function getConfigurationByFile(file) {
  return fs.readJson(path.resolve("cypress", "config", `${file}.json`));
}

async function setupNodeEvents(on, config) {
  const file = config.env.configFile || "local";
  const envConfig = await getConfigurationByFile(file);

  config.baseUrl = envConfig.baseUrl;
  config.env = { ...config.env, ...envConfig };

  await addCucumberPreprocessorPlugin(on, config);

  on(
    "file:preprocessor",
    createBundler({
      plugins: [createEsbuildPlugin.default(config)],
    })
  );

  return config;
}

module.exports = defineConfig({
  e2e: {
    setupNodeEvents,
    specPattern: [
      "cypress/e2e/**/*.feature",
      "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    ],
    integrationFolder: "cypress/integration",
    e2eFolder: "cypress/e2e",
    supportFile: false,
    video: false,
    chromeWebSecurity: false,
    defaultCommandTimeout: 12000,
    pageLoadTimeout: 60000,
    viewportWidth: 1200,
    viewportHeight: 900,
    experimentalRunAllSpecs: true,
  },
  experimentalMemoryManagement: true,
});