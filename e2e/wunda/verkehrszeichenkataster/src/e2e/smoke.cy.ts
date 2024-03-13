describe('verkehrszeichenkataster smoke test', () => {
  beforeEach(() => cy.visit('/'));

  it('main page show authorization form', () => {
    cy.contains('Verkehrszeichen Kataster').should('exist');
    cy.get('#username').should('be.visible');
    cy.get('#password').should('be.visible');
    cy.contains('Anmelden').should('be.visible');
  });
});
