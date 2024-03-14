describe('lagis smoke test', () => {
  let userData;

  before(() => {
    cy.fixture('devSecrets.json').then((data) => {
      userData = data;
    });
  });

  beforeEach(() => cy.visit('/'));

  it('main page show authorization form', () => {
    cy.contains('LagIS Desktop').should('exist');
    // cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="email"]').type(userData.cheatingUser);
    // cy.get('input[type="password"]').should('be.visible');
    cy.get('input[type="password"]').type(userData.cheatingPassword);
    cy.get('.ant-btn').click();
  });
});
