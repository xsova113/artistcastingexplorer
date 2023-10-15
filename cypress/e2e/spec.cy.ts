describe('template spec', () => {
  it('check casting-japanese homepage', () => {
    cy.wait(20000)
    cy.visit('https://casting-japanese-git-main-xsova113.vercel.app/')
  })

  it('verifies casting-japanese page is loaded', () => {
    cy.wait(10000)
    cy.get('[data-cy="hero-text"]').should('contain', 'Discover')
  })
})