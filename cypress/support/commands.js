// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("parseXlsx", (inputFile) => {
    return cy.task("parseXlsx", { filePath: inputFile });
});

Cypress.Commands.add('checkIfElemExists', (elem) => {
    cy.wait(3001);
    cy.get('body').then($body => {
        if ($body.find(elem).length > 0) {
            cy.get(elem).check({ force: true }).should('be.checked');
            cy.log("exist")
        } else {
            cy.log("doesn't")
        }
    });
})

Cypress.Commands.add('clickIfElemExists', (elem) => {
    cy.get('body').then($body => {
        if ($body.find(elem).length > 0) {
            cy.get(elem).should('be.visible').click({ force: true });
        }
    });
})

Cypress.Commands.add('apiCall', (request, endpoint, message, messageType) => {
    cy.readFile('./cypress/fixtures/payloads/' + message + '.json').then((json) => {
        cy.request(request, `${endpoint}/SkavaUs.${message}`, json).then((response) => {
            cy.log("Status Code Validation").then(() => {
                expect(response.status).to.be.equal(200);
            });
            cy.log("Body Fields Validation").then(() => {
                expect(response.body.messageType).to.be.equal('SkavaUs.' + messageType);
                expect(response.body.body).not.to.be.equal("null");
            });
        });
    });
})
