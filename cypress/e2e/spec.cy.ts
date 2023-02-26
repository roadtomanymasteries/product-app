describe('template spec', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5173/api/products');
    cy.request('POST', 'http://localhost:6060/api/products/reseed');
  });

  it('loads app successfully', () => {
    cy.contains('Product Management Console');
    cy.get('[data-testid="EditIcon"]').should('have.length', 5);
  });

  it('deletes product successfully', () => {
    cy.get('[role="checkbox"]').eq(1).click();
    cy.get('[data-testid="DeleteIcon"]').click();
    cy.get('[role="checkbox"]').should('have.length', 4);
  });

  it('deletes multiple products successfully', () => {
    cy.get('[role="checkbox"]').eq(1).click();
    cy.get('[role="checkbox"]').eq(3).click();
    cy.get('[data-testid="DeleteIcon"]').click();
    cy.get('[role="checkbox"]').should('have.length', 3);
  });

  it('adds new product successfully', () => {
    cy.get('[data-testid="AddIcon"]').click();
    cy.get('#description').type('testing');
    cy.get('#brand').type('Xiaomi');
    cy.get('#model').type('GHJK');
    cy.contains(/submit/i).click();
    cy.get('[data-testid="KeyboardArrowRightIcon"]').click();
    cy.contains('Xiaomi');
  });

  it('updates new product successfully', () => {
    cy.get('[data-testid="EditIcon"]').eq(0).click();
    cy.get('#brand').clear().should('have.value', '').type('LGer');
    cy.contains(/submit/i).click();
    cy.contains('LGer');
  });

  it('filters product successfully', () => {
    cy.get('.MuiInputBase-root > #product-filter-select').click();
    cy.get('[data-value="brand"]').click();
    cy.get('#search-filter-term').type('samsung');
    cy.get('.css-1q36rmd-MuiStack-root > :nth-child(3)').click();
    cy.contains('Samsung');
  });

  it('resets filter type and search term successfully', () => {
    cy.get('.MuiInputBase-root > #product-filter-select').click();
    cy.get('[data-value="brand"]').click();
    cy.get('#search-filter-term').type('samsung');
    cy.get('.css-1q36rmd-MuiStack-root > :nth-child(3)').click();
    cy.contains('Sony').should('not.exist');
  });

  it('navigates to individual product view page successfully', () => {
    const path = 'api/products/631f96fdf00c1b6daa7b7b26';

    cy.contains('631f96fdf00c1b6daa7b7b26').click();
    cy.url().should('include', path);
  });
});
