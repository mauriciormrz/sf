class ViewCartPage {

    elements = {
        cartCheckoutBtn: () => cy.get('[data-testid="qa-cart-checkout"]'),
        donationCheckBox: () => cy.get('input#donationCheckbox_1'),
    };

    checkout(donation) {
        cy.intercept('GET',`/orchestrationservices/storefront/loyalty*`).as("loyaltyStatus");
        cy.intercept('GET',`/orchestrationservices/storefront/customers/payments?*`).as("paymentStatus");
        if (donation.toUpperCase() == "YES") {
            this.elements.donationCheckBox().check({ force: true }).should('be.checked');
        }
        else {
            this.elements.donationCheckBox().uncheck({ force: true });
        }
        this.elements.cartCheckoutBtn().click();
    }
}

module.exports = new ViewCartPage();