import DropdownMenu from "./DropdownMenu";

class PaymentsPage {

    elements = {
        shippingMethodChangeLnk: () => cy.get('[data-testid="qa-shipping-method-title"] .checkout-change-button'),
        subscriptionsLink: () => cy.get('a[href*="myaccount/subscriptions"]'),
        paymentsLink: () => cy.get('a[href*="myaccount/payments"]'),
    };

    verifyPaymentMethod() {
        DropdownMenu.hoverMyAccount();
        this.elements.paymentsLink().click();
        cy.wait(5000)
    }
}

module.exports = new PaymentsPage();
