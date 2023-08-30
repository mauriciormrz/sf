import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";


Given("I load the description file of the Contracts {string}", (file) => {

  cy.parseXlsx("./cypress/fixtures/" + file).then(data => {
    skavaContracts = data;
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

Given("I start the kafka-topic {string} flow by producing {string}", (topic, request_message) => {

  timestampQuery = new Date().getTime();
  cy.writeFile(Cypress.env('JSON_LOCATION'), { "messages": [] });
  //cy.log("request_message: ", request_message);
  //cy.log("timestampQuery: ", timestampQuery);
  cy.task('kafkaMessage', { topic, payload: request_message})
});


When("I consume the message {string} with {string} set up to {string}", (contract, recordid, value) => {

  //message = 0;
  //cy.wait(13000);

  //cy.readFile(Cypress.env('JSON_LOCATION')).then(data => {
  //  //if (data.length) {
  //    message = data.messages.filter((e) => (e.contract === contract && e.recordId === value && e.timestamp >= timestampQuery))[0];
  //  //}
  //  //cy.log(data);
  //});

  /*
  if (Object.keys(message).length==0) {
    cy.wait(1000);
    cy.fixture('messages').then(data => {
      message = data.messages.filter((e) => (e.contract === contract && e.recordId === value && e.timestamp >= timestampQuery))[0];
      cy.log(data);
    });
  }

  if (!!message) {
    cy.wait(1000);
    cy.fixture('messages').then(data => {
      cy.log(data)
      message = data.messages.filter((e) => (e.contract === contract && e.recordId === value && e.timestamp >= timestampQuery))[0];
      cy.log(data);
    });
  }
  */

  //cy.log(timestampQuery);
  /*
    //cy.writeFile(Cypress.env('JSON_LOCATION'), { "messages": [] });
    //cy.readFile('messages.json')
    cy.wait(13000);
    cy.readFile(Cypress.env('JSON_LOCATION')).then(data => {
      cy.log(data);
      message = data.messages.filter((e) => (e.contract === contract && e.recordId === value && e.timestamp >= timestampQuery))[0];
      expect(message).to.exist
    })
  */

  cy.wait(13000);

  if (contract == 'YLAccountSubscription') {
    cy.wait(17000);
  }

  if ( contract == 'OrderPlacedProcessed') {
    cy.wait(7000);
  }

  cy.readFile(Cypress.env('JSON_LOCATION')).then(data => {
    message = data.messages.filter((e) => (e.contract === contract && e.recordId === value && e.timestamp >= timestampQuery))[0];
    //message = data.messages.filter((e) => (e.contract === contract && e.recordId === value))[0];
    expect(message).to.exist
  });
});



Then("The message should have the structure of the JSON {string}", (name) => {

  contract = skavaContracts.find(c => c.name.toLowerCase().trim() === name.toLowerCase().trim());
  //cy.log("Skava: ", skavaContracts)
  //cy.log("Contract: ", contract.data);
  //cy.log("Message: ", message);

  requiredFields = contract.data.filter((e) => (e.length === 3 && e[2].toLowerCase() === 'yes'));
  requiredFields.forEach(f => expect(message).to.have.property(f[0]));
});

