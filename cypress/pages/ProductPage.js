import HomePage from "./HomePage";

class ProductPage {

    elements = {
        productNameText: () => cy.get('[data-testid=qa-product-name]'),
        quantityCtrl: () => cy.get('[data-testid=qa-product-quantity]'),
        addCartButton: () => cy.get('[data-testid=qa-addcart]'),
        viewCartButton: () => cy.get('[data-testid=qa-cartcheckout]'),
    };

    addingItemsToCart(dataTable) {
        dataTable.hashes().forEach((elem) => {
            this.addItemToShoppingCart(elem);
        });
    }

    addItemToShoppingCart({ sku, item, quantity }) {
        HomePage.elements.searchInput()
            .type(sku, { force: true, delay: 50 })
            .should('have.value', sku)
            .type('{enter}');

        this.elements.productNameText().should('contain', item);
        this.elements.quantityCtrl().clear().type(quantity);
        this.elements.addCartButton().click();

        HomePage.elements.toastContent().should('have.text', 'Added to Cart Successfully');
        HomePage.elements.toastButton().click();

        this.elements.viewCartButton().click();
    }
}

module.exports = new ProductPage();
