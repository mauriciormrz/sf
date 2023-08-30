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
const kafkaConsumer = require("./cypress/helpers/rdkafka-skava-consumer");
const kafkaProducer = require("./cypress/helpers/rdkafka-producer");

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

  //rdkafka consumer implementation
  kafkaConsumer()
    .catch(err => {
      console.error('error in kafka consumer: ', err);
    })

  //rdkafka producer implementation
  on('task', {
    kafkaMessage: ({ topic, payload }) => {
      return kafkaProducer.sendMessage(topic, payload);
    }
  });

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