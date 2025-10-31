describe('Pruebas de regresión IMDb Simplificado', () => {

  beforeEach(() => {
    cy.visit('/');
  });

  it('TC01 - Carga correctamente la página principal', () => {
    cy.contains('Películas').should('exist');
    cy.get('section').should('have.length.at.least', 1);
  });

  it('TC02 - Lista de películas se carga correctamente', () => {
    cy.visit('/movies');
    cy.get('h2').should('contain', 'Películas');
    cy.get('div').contains('Ver detalles').should('exist');
  });

  it('TC03 - Búsqueda de película por título', () => {
    cy.visit('/movies');
    cy.get('input[placeholder="Buscar películas..."]').type('Anillos');
    cy.get('div').contains('El Señor de los Anillos').should('exist');
  });

  it('TC04 - Visualiza detalle de una película', () => {
    cy.login();

    cy.visit('/movies');
    cy.contains('Ver detalles').first().click();

    cy.url().should('include', '/movies/');
    cy.get('h2').should('exist');
  });

  it('TC05 - Cambio de tema claro/oscuro', () => {
    cy.login();

    cy.get('button').contains('Claro').click();
    cy.get('body').should('have.css', 'background-color');
  });

});
