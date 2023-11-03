//const fs = require("fs");

describe("Skava Account Messages", () => {
  it("SkavaAccountCreated", () => {
    cy.apiCall('POST', Cypress.env('ACCOUNTS_ENDPOINT'), 'SkavaAccountCreated', 'SkavaAccountProcessed');
  });
  it("SkavaAccountModified", () => {
    cy.apiCall('POST', Cypress.env('ACCOUNTS_ENDPOINT'), 'SkavaAccountModified', 'SkavaAccountProcessed');
  });
  it("SkavaCustomerAddressCreated", () => {
    cy.apiCall('POST', Cypress.env('ACCOUNTS_ENDPOINT'), 'SkavaCustomerAddressCreated', 'SkavaCustomerAddressProcessed');
  });
  it("SkavaCustomerAddressDeleted", () => {
    cy.apiCall('POST', Cypress.env('ACCOUNTS_ENDPOINT'), 'SkavaCustomerAddressDeleted', 'SkavaCustomerAddressProcessed');
  });
  it("SkavaCustomerAddressUpdated", () => {
    cy.apiCall('POST', Cypress.env('ACCOUNTS_ENDPOINT'), 'SkavaCustomerAddressUpdated', 'SkavaCustomerAddressProcessed');
  });
});


describe("Skava Order Messages", () => {
  it("OrderPlaced", () => {
    cy.apiCall('POST', Cypress.env('ORDERS_ENDPOINT'), 'OrderPlaced', 'OrderPlacedProcessed');
  });
  it("OrderReturned", () => {
    cy.apiCall('POST', Cypress.env('ORDERS_ENDPOINT'), 'OrderReturned', 'OrderReturnedProcessed');
  });
  it("OrderReplaced", () => {
    cy.apiCall('POST', Cypress.env('ORDERS_ENDPOINT'), 'OrderReplaced', 'OrderReplacedProcessed');
  });
});
