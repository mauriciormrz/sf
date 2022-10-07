class SigninPage {

    elements = {
        usernameInput: () => cy.get('input#loginUsername'),
        continueBtn: () => cy.get('button#continue-btn'),
        passwordInput: () => cy.get('input#loginPassword'),
        loginBtn: () => cy.get('button#login-btn'),
        errorMessageText: () => cy.contains('Incorrect username or password.'),
    };

    logInformation(user) {
        this.elements.usernameInput().type(user, { force: true, delay: 50 }).should('have.value', user);
        //cy.clickIfElemExists("#onetrust-close-btn-container button.onetrust-close-btn-handler");
        this.elements.continueBtn().click();
    }

    logCredentials(user, password) {
        this.logInformation(user);
        this.elements.passwordInput().type(password);
        this.elements.loginBtn().click();
    }
}

module.exports = new SigninPage();