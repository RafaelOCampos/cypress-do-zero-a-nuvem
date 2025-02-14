Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data ={ //'fillMandatoryFieldsAndSubmit', ()

    fisrtName: 'John',              //valores padrão se não passar a CONST com o valor data ele pega
    lastName: 'Doe',                // o valor padrão  
    email: 'johndoe@example.com',   //  cy.fillMandatoryFieldsAndSubmit(data) pega do DATA
    text: 'Test.'                   // cy.fillMandatoryFieldsAndSubmit() pega o padrão
}) => {

  cy.get('#firstName').type(data.fisrtName)
  cy.get('#lastName').type(data.lastName) //cy.get('#lastName').type('Oliveira Campos')
  cy.get('#email').type(data.email) 
  cy.get('#open-text-area').type(data.text)
  cy.contains ('button', 'Enviar').click()//cy.get('button[type="submit"]').click() 
})






// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })