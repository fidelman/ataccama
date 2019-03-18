describe('App initialization', () => {
  beforeEach(() => {
    cy.seedAndVisit()
  })

  it('should render all rows from 1 nesting level', () => {
    cy.get('.cy-row').should('have.length', 11)
  })

  it('should remove 1st element', () => {
    cy.get('.cy-row').should('have.length', 11)
    cy.get('.cy-row')
      .find('.cy-btn-remove')
      .first()
      .click()
    cy.get('.cy-row').should('have.length', 10)
  })

  it('should show/hide kids', () => {
    cy.get('.cy-row')
      .should('have.length', 11)
      .find('.cy-toggle-show')
      .first()
      .should('contain', 'More')
      .click()
      .should('contain', 'Less')

    cy.get('.cy-row').should('have.length', 12)

    cy.get('.cy-row')
      .find('.cy-toggle-show')
      .first()
      .should('contain', 'Less')
      .click()
      .should('contain', 'More')

    cy.get('.cy-row').should('have.length', 11)
  })
})
