import { Given, When, Then, } from "@badeball/cypress-cucumber-preprocessor";

Given('I insert {string} in the {string} table', (recordId, queueTable) => {
    const SQL_INSERT_RECORDID_INTO_QUEUETABLE =
        'INSERT INTO cmsuser.' + queueTable + ' (recordid) VALUES (' + recordId + ')';

    cy.writeFile(Cypress.env('JSON_LOCATION'), { "messages": [] });
    cy.task('sqlQuery', SQL_INSERT_RECORDID_INTO_QUEUETABLE).then(
        resolvedValue => {
            expect(resolvedValue.rowsAffected).to.equal(1)
        }
    );
});



When('I consume the message with column {string} set up to {string}', (field, recordid) => {
    //cy.log('---');
});


Then('I should see the contract {string}', (recordId, queueTable) => {
    //cy.log('---');
});

