const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");

//Environment Variables Requirements
const dotenv = require("dotenv");
dotenv.config();
const dotenvPlugin = require("cypress-dotenv");

//Oracle Requirements
const DBManager = require("./cypress/helpers/db-manager");

//Kafka Requirements
const consume = require("./cypress/helpers/kafkajs-consumer");
const rdkafka_legacy_consumer = require("./cypress/helpers/rdkafka-legacy-consumer");

const rdkafka_skava_consumer = require("./cypress/helpers/rdkafka-skava-consumer");

//Excel requirements
const xlsx = require("node-xlsx").default;
const fs = require("fs"); // for file
const path = require("path"); // for file path


console.clear();
console.log("------------------------------------------------------------------------------------------");

async function setupNodeEvents(on, config) {

  //Cucumber implementation
  await preprocessor.addCucumberPreprocessorPlugin(on, config);
  on(
    "file:preprocessor",
    createBundler({
      plugins: [createEsbuildPlugin.default(config)],
    })
  );
  allureWriter(on, config);

  //Environment Variables Implementation
  config = dotenvPlugin(config);

  //Kafkajs implementation
  //consume()
  //  .catch(err => {
  //    console.error('error in consumer: ', err);
  //  });

  //rdkafka implementation
  rdkafka_legacy_consumer()
    .catch(err => {
      console.error('error in legacy consumer: ', err);
    })

  rdkafka_skava_consumer()
    .catch(err => {
      console.error('error in skava consumer: ', err);
    })
//
  //Oracle implementation
  on('task', {
    sqlQuery: ({ query, db }) => {
      return DBManager.queryData(query, db);
    }
  });

  //Excel implementation
  on("task", {
    parseXlsx({ filePath }) {
      return new Promise((resolve, reject) => {
        try {
          const jsonData = xlsx.parse(fs.readFileSync(filePath));
          resolve(jsonData);
        } catch (e) {
          reject(e);
        }
      });
    }
  });

  return config;
}

module.exports = defineConfig({
  projectId: "7iv7xb",
  e2e: {
    setupNodeEvents,
    specPattern: [
      "cypress/e2e/features/storefront/*.feature",
      "cypress/e2e/features/topics/L2S/*.feature",
      "cypress/e2e/features/topics/legacy-skava/*.feature",
      "cypress/e2e/features/topics/skava-legacy/*.feature",
    ],
    chromeWebSecurity: false,
    scrollBehavior: false,
    viewportWidth: 1280,
    viewportHeight: 1280,
    defaultCommandTimeout: 7000,
    env: {
      api_path: "/orchestrationservices/storefront/customers",
      allureReuseAfterSpec: true,
    },
    retries: {
      runMode: 0,
      openMode: 0
    },
    video: true,
    screenshotOnRunFailure: true
  }
});