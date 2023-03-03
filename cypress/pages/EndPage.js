class EndPage {

    elements = {
        logOutMessageText: () => cy.contains('You have been logged out.'),
    };
}

module.exports = new EndPage();



