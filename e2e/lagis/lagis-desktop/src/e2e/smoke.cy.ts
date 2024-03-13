describe('lagis smoke test', () => {
  beforeEach(() => cy.visit('/'));

  it('main page show authorization form', () => {
    cy.contains('LagIS Desktop').should('exist');
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
    cy.contains('Anmeldung').should('be.visible');
  });
});
