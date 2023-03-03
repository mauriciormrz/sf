class CheckoutPage {

    elements = {
        shippingMethodChangeLnk: () => cy.get('[data-testid="qa-shipping-method-title"] .checkout-change-button'),
        shippingMethodRadioBtn: (shipping_method) => cy.get('[id*="' + shipping_method + '"]'),
        shippingMethodContinueBtn: () => cy.get('[data-testid="qa-ship-methods-continue"]'),
        paymentMethodChangeLnk: () => cy.get('.payment-change-button'),

        paymentMethodRadioBtn: (payment_method) => {
            switch (payment_method) {
                case 'Card ending with':
                    return cy.xpath("(//*/span[contains(text(),'Expires')]/../../../../input)[1]");
                default:
                    return cy.xpath("(//*/div[contains(text(),'" + payment_method + "')]/../../../../input)[1]");
            }
        },

        paymentMethodContinueBtn: () => cy.get('button.px-5'),
        brandPartnerStringCheckBox: () => "input#brandPartnerCheckbox",
        submitOrderBtn: () => cy.get('button[data-testid="qa-submit-order"]'),
    }

    submitOrder() {
        cy.checkIfElemExists(this.elements.brandPartnerStringCheckBox());
        this.elements.submitOrderBtn().click();
    }


    selectShippingMethod(shipping_method) {
        this.elements.shippingMethodChangeLnk().should('be.visible').click();
        this.elements.shippingMethodRadioBtn(shipping_method).check({ force: true }).should('be.checked')
        this.elements.shippingMethodContinueBtn().click();
    }

    selectPaymentMethod(payment_method) {

        this.elements.paymentMethodChangeLnk().should('be.visible').click();
        switch (payment_method) {
            case 'Credit Card':
                payment_method = 'Card ending with';
                break;
            case 'ACH':
                payment_method = 'Account ending in';
                break;
            case 'PayPal':
                payment_method = 'PayPal Account';
                break;
        }
        this.elements.paymentMethodRadioBtn(payment_method).check({ force: true }).should('be.checked');
        this.elements.paymentMethodContinueBtn().click({ force: true });
    }
}

module.exports = new CheckoutPage();


