const path = require('path');
const fs = require('fs-extra');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const { defineConfig } = require('cypress');
const preprocessor = require('@badeball/cypress-cucumber-preprocessor');
const createEsbuildPlugin = require('@badeball/cypress-cucumber-preprocessor/esbuild').createEsbuildPlugin;

async function getConfigurationByFile(file) {
  return fs.readJson(path.resolve('cypress', 'config', `${file}.json`));
}

async function setupNodeEvents(on, config) {
  const file = config.env.configFile || 'local';
  const envConfig = await getConfigurationByFile(file);

  config.baseUrl = envConfig.baseUrl;
  config.env = { ...config.env, ...envConfig };

  await preprocessor.addCucumberPreprocessorPlugin(on, config);

  on(
    'file:preprocessor',
    createBundler({
      plugins: [createEsbuildPlugin(config)],
    })
  );

  return config;
}

module.exports = defineConfig({
  e2e: {
    setupNodeEvents,
    specPattern: [
      'cypress/instegration_e2e/**/*.feature',
      'cypress/instegration_e2e/**/*.cy.{js,jsx,ts,tsx}',
    ],
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