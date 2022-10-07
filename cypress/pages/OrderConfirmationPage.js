class OrderConfirmationPage {

    elements = {
        orderCongratsText: () => cy.get('.order-congrats-text'),
        orderConfirmationId: () => cy.contains('[data-testid="qa-order-confirmation-id"]'),
    };
}

module.exports = new OrderConfirmationPage();



