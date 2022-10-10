const { defineConfig } = require("cypress");

//Cucumber requirements
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const addCucumberPreprocessorPlugin = require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;

//Environment Variables Requirements
const dotenvPlugin = require('cypress-dotenv');

//Oracle Requirements
const DBManager = require('./cypress/helpers/db-manager');

//Kafka Requirements
//const { consumer } = require('./cypress/helpers/kafka-consumer');

const consume = require('./cypress/helpers/kafka-consumer')

require('dotenv').config();
console.clear();
console.log("------------------------------------------------------------------------------------------")


module.exports = defineConfig({
  projectId: "7iv7xb",
  e2e: {
    async setupNodeEvents(on, config) {
      //Environment Variables Implementation
      config = dotenvPlugin(config);

      //Cucumbre implementation
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      });
      on("file:preprocessor", bundler);
      await addCucumberPreprocessorPlugin(on, config);

      //Kafka implementation
      consume().catch(err => {
        console.error('error in consumer: ', err);
      });

      //Oracle implementation
      on('task', {
        sqlQuery: query => {
          //console.log(query);
          return DBManager.queryData(query);
        },
      });

      /*--------------------------------------------------------*/
      //consumer.connect();
      //consumer
      //	.on('ready', () => {
      //		console.log('consumer ready...');
      //		consumer.subscribe(['my-kafka-topic']);
      //		consumer.consume();
      //	}).on('data', data => {
      //		console.log(`received message: ${data.value}`);
      //	});
      /*--------------------------------------------------------*/

      return config;
    },
    specPattern: "cypress/e2e/features/*.feature",
    baseUrl: "https://ext5.youngliving.com",
    chromeWebSecurity: false,
    scrollBehavior: false,
    viewportWidth: 1280,
    viewportHeight: 1280,
    env: {
      username: "yleo",
      password: "I know what 2 do",
      api_path: "/orchestrationservices/storefront/customers",
    },
    retries: {
      runMode: 2,
      openMode: 0,
    },
    video: true,
    screenshotOnRunFailure: true,
  },
});

