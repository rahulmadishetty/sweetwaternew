describe('Login Component Frontend-Only Tests', () => {
  const baseUrl = 'http://localhost:3000';

  beforeEach(() => {
    cy.visit(baseUrl);
    // Open login modal before each test
    cy.contains('Login').click(); // Open login modal
    cy.get('.bg-white').should('be.visible'); // Ensure the modal is visible
  });

  it('should successfully login with a regular user', () => {
    cy.get('input[name="email"]').type('user@example.com');
    cy.get('input[name="password"]').type('user123');
    cy.get('button[type="submit"]').contains('Sign In').click();
  });

  it('should successfully login with an admin user', () => {
    cy.get('input[name="email"]').type('admin@example.com');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').contains('Sign In').click();

    // Simulate admin login success based on frontend logic
    cy.contains('Admin Mode').should('be.visible');
  });

  it('should show an error for a short password', () => {
    cy.get('input[name="email"]').type('user@example.com');
    cy.get('input[name="password"]').type('123');
    cy.get('button[type="submit"]').contains('Sign In').click();

    // Verify the error message for password length
    cy.contains('Password must be at least 6 characters long').should('be.visible');
  });

  it('should toggle password visibility when clicking the eye icon', () => {
    cy.get('input[name="password"]').type('password123');
    cy.get('.absolute.inset-y-0.right-0.pr-3').click(); // Show password
    cy.get('input[name="password"]').should('have.attr', 'type', 'text');
    cy.get('.absolute.inset-y-0.right-0.pr-3').click(); // Hide password
    cy.get('input[name="password"]').should('have.attr', 'type', 'password');
  });

  it('should close the login modal when the close button is clicked', () => {
    // Target the modal close button and click it
    cy.get('.absolute.top-0.right-0.m-4').first().click();

    // Verify the specific modal for login is no longer visible
    cy.get('.bg-white.p-8.rounded-lg.shadow-xl').should('not.exist'); // Ensure the modal is gone
  });
});
