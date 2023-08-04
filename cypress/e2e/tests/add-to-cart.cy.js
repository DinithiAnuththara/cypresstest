/// <reference types="cypress" />

import {selectBook} from "../pages/add-tocart"

describe('Amazon Automation', () => {
    beforeEach(() => {
        cy.visit('https://www.amazon.com/')
    })

    it('Should be able to add a book to the cart', () => {
        selectBook({
            category : "Books",
            searchTerm : "Automation",
            reviews : "4 and up",
            language : "English",
        });
    })
})
