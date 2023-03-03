class HomePage {

    elements = {
        singInLink: () => cy.get('#dropdown-cutom > p'),
        searchInput: () => cy.get('[data-testid=qa-search-input]'),
        toastContent: () => cy.get('.toast-content'),
        toastButton: () => cy.get('#toastButton'),
        productName: () => cy.get('[data-testid="qa-product-name"]'),
    };

    login() {
        //cy.exec('npm cache clear --force')
        cy.visit(Cypress.env('STOREFRONT_URL') + "/us/en/", {
            auth: {
                username: Cypress.env('AUTH0_USERNAME'),
                password: Cypress.env('AUTH0_PASSWORD')
            }
        });
        cy.intercept('POST', `/orchestrationservices/storefront/customers/login?*`).as("loginStatus");
        this.elements.singInLink().click();
    }
}

module.exports = new HomePage();






