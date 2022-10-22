import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

let contracts = "";

Given("I insert {string} in the {string} table", (recordId, queueTable) => {
  const SQL_INSERT_RECORDID_INTO_QUEUETABLE = 'INSERT INTO cmsuser.' + queueTable + ' (recordid) VALUES (' + recordId + ')';

  cy.writeFile(Cypress.env('JSON_LOCATION'), { "messages": [] });
  cy.task('sqlQuery', SQL_INSERT_RECORDID_INTO_QUEUETABLE).then(
    resolvedValue => {
      expect(resolvedValue.rowsAffected).to.equal(1)
    }
  );
});

When(
  "I consume the message with column {string} set up to {string}",
  (field, recordid) => {
    cy
      .parseXlsx("./cypress/fixtures/SkavaMessageContracts.xlsx")
      .then(jsonData => {
        contracts = jsonData;
        //cy.wrap(contracts).as("jsonDataFromExcel");
        //cy.log(contracts);
      });
    //cy.get("@jsonDataFromExcel").then((contracts) => {
    //cy.log("contractsData:", contracts);
    //});
  }
);

Then("I should see the contract {string}", contract => {
  cy.log("3--------------------------------");

  const message = contracts.find(c => c.name.toUpperCase().trim() === contract.toUpperCase().trim());
  cy.log(message)
  if (message) {
    cy.log(contracts);
    cy.log(message.data);
    cy.log(message.name);
    cy.log(message.data[0]);

    const field = message.data.find(f => f[0] === "orderId");
    if (field) {
      cy.log(field);
    } else {
      cy.log("no lo encontró");
    }
  } else {
    cy.log("nada");
  }

  //const field = message.find((m) => c.name === "name");
  //cy.log(field);
  cy.log("--------------------------------");

  cy.fixture("topics3").then(testData => {
    cy.log(testData);
  });
});