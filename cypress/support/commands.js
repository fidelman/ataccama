import { fetchDataUrl } from '../../src/config'

Cypress.Commands.add('seedAndVisit', (seedData = 'fixture:users') => {
  cy.server()
  cy.route('get', fetchDataUrl, seedData).as('load')
  cy.visit('/')
  cy.wait('@load')
})
