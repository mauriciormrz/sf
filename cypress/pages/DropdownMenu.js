class DropdownMenu {

    elements = {
        dropdownLink: () => cy.get('button#dropdown-cutom'),
        welcomeText: () => cy.get('.welcome-title'),
        signoutBtn: () => cy.get('button[data-testid=qa-signout]'),
    };

    hoverMyAccount() {
        this.elements.dropdownLink().trigger('mouseover');
    }

}

module.exports = new DropdownMenu();