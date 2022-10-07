class HomePage {

    elements = {
        singInLink: () => cy.get('#dropdown-cutom > p'),
        searchInput: () => cy.get('[data-testid=qa-search-input]'),
        toastContent: () => cy.get('.toast-content'),
        toastButton: () => cy.get('#toastButton'),
        productName: () => cy.get('[data-testid="qa-product-name"]'),
    };

    login() {
        cy.exec('npm cache clear --force')
        cy.visit("/us/en/", {
            auth: {
                username: Cypress.env('username'),
                password: Cypress.env('password')
            }
        });
        
        cy.intercept('POST',`/orchestrationservices/storefront/customers/login?*`).as("loginStatus");
        this.elements.singInLink().click(); 
    }
}

module.exports = new HomePage();





