/// <reference types="cypress" />

const map = {
    category: "#searchDropdownBox",
    search_box: "#twotabsearchtextbox",
    search_button: "#nav-search-submit-button",
    reviews_1: "#reviewsRefinements > ul > span:nth-child(1)",
    language_list: 'ul[data-csa-c-content-id="3291435011"] li span a span[class="a-size-base a-color-base"]',
    language: '[data-csa-c-content-id="3291435011"] li span a div input',
    name_of_book: 'h2[class="a-size-mini a-spacing-none a-color-base s-line-clamp-2"]',
    book: 'a[class="a-link-normal s-underline-text s-underline-link-text s-link-style a-text-normal"]',
    quantity: "#quantity",
    add_to_cart: "#add-to-cart-button",
    go_to_cart: "#sw-gtc > span > a",
    cart_title: 'span[class="a-truncate-full a-offscreen"]',
    book_name: "#sc-active-4bf23b96-34f4-4497-b9c8-880f012c6c00 > div.sc-list-item-content > div > div:nth-child(2) > ul > li.a-spacing-mini > span > a > span.a-size-base-plus.a-color-base.sc-product-title.sc-grid-item-product-title > span > span.a-truncate-full.a-offscreen",
    qty: "#a-autoid-0-announce > span.a-dropdown-prompt",
    delete_cart: "#sc-active-4bf23b96-34f4-4497-b9c8-880f012c6c00 > div.sc-list-item-content > div > div:nth-child(2) > div.a-row.sc-action-links > span.a-size-small.sc-action-delete > span > input",
    empty_cart_msg: "#sc-active-cart > div > div > div > h1",
};

export function selectBook(details) {
    cy.get(map.category).select(details.category, { force: true });
    cy.get(map.search_box).type(details.searchTerm);
    cy.get(map.search_button).click();

    // Selecting the rating
    if (details.reviews === "4 and up") {
        cy.get(map.reviews_1).click();
    }
    cy.wait(10000);

    // Selecting the language
    cy.get(map.language_list).each(($elment, $index) => {
        let x = $elment.text();
        if (x == details.language) {
            cy.get(map.language).eq($index).click({ force: true });
        }
    });
    cy.wait(10000);

    // Storing the name of the book
    var bookName;
    cy.get(map.name_of_book).eq(1).then((name) => {
        let book = name.text();
        bookName = book.trim();
    });

    cy.get(map.book).eq(1).click();

    cy.get(map.quantity).select('2', { force: true });
    cy.get(map.add_to_cart).click();

    cy.get(map.go_to_cart).click({ force: true });
    cy.wait(2000);

    cy.get(map.cart_title).then((cartTitle) => {
        let title = cartTitle.text();
        expect(bookName).to.contain(title);
    });

    cy.get(map.book_name).should('have.text',bookName);
    cy.get(map.qty).should('have.text','2');

    cy.get(map.delete_cart).click();
    cy.get(map.empty_cart_msg).should('have.text','                Your Amazon Cart is empty.    ');
}
