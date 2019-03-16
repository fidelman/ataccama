describe('App initialization', () => {
  beforeEach(() => {
    cy.seedAndVisit()
    cy.get('.cy-row').as('rows')
  })

  it('should render all rows from 1 nesting level', () => {
    cy.get('@rows').should('have.length', 11)
  })

  it('should remove 1st element', () => {
    cy.get('@rows').should('have.length', 11)
    cy.get('@rows')
      .find('.cy-btn-remove')
      .first()
      .click()
    cy.get('@rows').should('have.length', 10)
  })

  it('should show/hide kids', () => {
    cy.get('@rows').should('have.length', 11)
    cy.get('@rows')
      .find('.cy-toggle-show')
      .first()
      .should('contain', 'More')
      .click()
      .should('contain', 'Less')

    cy.get('@rows').should('have.length', 12)

    cy.get('@rows')
      .find('.cy-toggle-show')
      .first()
      .should('contain', 'Less')
      .click()
      .should('contain', 'More')
    cy.get('@rows').should('have.length', 11)
  })
})
