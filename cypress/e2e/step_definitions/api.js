import { Given, When, Then, } from "@badeball/cypress-cucumber-preprocessor";


Given("I create the resource with the endpoint {string} and the request method {string}", (endpoint, request) => {
    cy.request('POST', 'https://skava-accounts-integration-test.awsvodev.yleo.cloud/api/messages/SkavaUs.SkavaAccountCreated', {
        skavaCustomerId: "72247415",
        countryIso2: "US",
        phone: "1234567890",
        email: "molab91296@twugg.com",
        languageIso: "en",
        firstName: "Mauricio",
        lastName: "Ramirez",
        referenceId: "REGUSER_72247415",
        hasDonationRoundUp: false,
        customerGuid: "38eef677-651a-47f6-a1b2-b5c027a16387",
        enrollerId: "1040",
        sponsorId: "1040",
        ylcustomerId: 4686341
    }).then((response) => {
        cy.log('response', response);
    });
});

When('I send the body {string}', (body) => {

})

Then('I get response code {string}', (code) => {

})

