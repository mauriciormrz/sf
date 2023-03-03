import { Given, When, And, Then, } from "@badeball/cypress-cucumber-preprocessor";

const homePage = require("../../pages/HomePage");
const signinPage = require("../../pages/SigninPage");
const dropdownMenu = require("../../pages/DropdownMenu");
const endPage = require("../../pages/EndPage");

Given("I am at the Login page", () => {
    homePage.login();
});

When('I fill out the account email field with the value {string}', (user) => {
    signinPage.logInformation(user);
})

When('I fill out the password field with the value {string}', (password) => {
    signinPage.elements.passwordInput().type(password);
})

When('I hit the login button', () => {
    signinPage.elements.loginBtn().click();
})

Then('I should be at the home page', () => {
    cy.wait("@loginStatus").wait(1001);
    dropdownMenu.hoverMyAccount();
    dropdownMenu.elements.welcomeText().should('contain', 'Welcome');

})

Then('I logout', () => {
    dropdownMenu.elements.signoutBtn().click();
    endPage.elements.logOutMessageText().should('be.visible');
})

Then('the error message {string} is displayed', (error_message) => {

    signinPage.elements.errorMessageText().should('contain', error_message)
})
