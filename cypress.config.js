const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const addCucumberPreprocessorPlugin = require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;


module.exports = defineConfig({
  projectId: 'ewbggm',
  e2e: {
    async setupNodeEvents(on, config) {
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      });

      on("file:preprocessor", bundler);
      await addCucumberPreprocessorPlugin(on, config);

      return config;
    },
    specPattern: "cypress/e2e/features/*.feature",
    baseUrl: "https://clone.youngliving.com",
    chromeWebSecurity: false,
    scrollBehavior: false,
    viewportWidth: 1280,
    viewportHeight: 1280,
    env: {
      username: "yleo",
      password: "I know what 2 do",
      api_path:"/orchestrationservices/storefront/customers",
    },
    retries: {
      runMode: 2,
      openMode: 0,
    },
    video: true,
    screenshotOnRunFailure: true,
  },
});

