import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";


Given("I load the description file of the Contracts {string}", (file) => {

  cy.parseXlsx("./cypress/fixtures/" + file).then(data => {
    skavaContracts = data;
    expect(skavaContracts).to.exist
  });
});


Given("I start the Topic's flows by inserting {string} into {string} table in {string}", (value, queueTable, db) => {

  timestampQuery = new Date().getTime();
  cy.writeFile(Cypress.env('JSON_LOCATION'), { "messages": [] });

  const SQL_INSERT_RECORDID_INTO_QUEUETABLE = 'INSERT INTO ' + queueTable + ' (recordid) VALUES (' + value + ')';
  cy.task('sqlQuery', { query: SQL_INSERT_RECORDID_INTO_QUEUETABLE, db }).then(
    resolvedValue => {
      expect(resolvedValue.rowsAffected).to.equal(1)
    }
  );
});


Given("I start the kafka-topic {string}-{string} flow by producing {string}", (entity, topic, request_message) => {

  timestampQuery = new Date().getTime();
  cy.writeFile(Cypress.env('JSON_LOCATION'), { "messages": [] });

  cy.task('kafkaMessage', { entity, topic, payload: request_message }).then(
    resolvedValue => {
      expect(resolvedValue).equal(null);
    }
  )
});


When("I consume the message {string} with {string} set up to {string}", (contract, recordid, value) => {

  cy.wait(15000);

  if (contract == 'YLAccountSubscription') {
    cy.wait(25000);
  }
  if (contract == 'OrderPlacedProcessed' || contract == 'OrderReplacedProcessed' || contract == 'OrderReturnedProcessed') {
    cy.wait(15000);
  }

  cy.readFile(Cypress.env('JSON_LOCATION')).then(data => {
    message = data.messages.filter((e) => (e.contract === contract && e.recordId === value && e.timestamp >= timestampQuery))[0];
    expect(message).to.exist
  });
});



Then("The message should have the structure of the JSON {string}", (name) => {

  contract = skavaContracts.find(c => c.name.toLowerCase().trim() === name.toLowerCase().trim());
  //cy.log("skavaContracts",skavaContracts)
  //cy.log("contract: ", contract);
  requiredFields = contract.data.filter((e) => (e.length === 3 && e[2].toLowerCase() === 'yes'))
  //cy.log("requiredFields:",requiredFields)
  requiredFields.forEach(f => expect(message).to.have.property(f[0]));
});

