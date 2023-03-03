import { Given, When, And, Then, } from "@badeball/cypress-cucumber-preprocessor";

const signinPage = require("../../pages/SigninPage");
const productPage = require("../../pages/ProductPage");
const viewCartPage = require("../../pages/ViewCartPage");
const checkoutPage = require("../../pages/CheckoutPage");
const orderConfirmationPage = require("../../pages/OrderConfirmationPage");


Given('I log in to the Storefront with user {string}  and password {string}', (user, password) => {
    signinPage.logCredentials(user, password);
})

When('I add the item to the shopping cart', (dataTable) => {
    cy.wait("@loginStatus").wait(1001);
    productPage.addingItemsToCart(dataTable);
})

When('I checkout the order with donation {string}', (donation) => {
    viewCartPage.checkout(donation);
})

Then('I fill the checkout form with {string} and {string}', (shipping_method, payment_method) => {

    cy.wait("@loyaltyStatus").then((request) => {
        cy.log("This is the @loyaltyStatus request intercepted", request);
        expect(request.response.statusCode).to.be.equal(200);
    });

    checkoutPage.selectShippingMethod(shipping_method);
    checkoutPage.selectPaymentMethod(payment_method);
    checkoutPage.submitOrder();
})

Then('I should see the order confirmation {string}', (congrats_message) => {
    orderConfirmationPage.elements.orderCongratsText().should("have.text", congrats_message);
})