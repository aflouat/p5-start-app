describe('account',()=>{
    before(() => {
        cy.login(); // Appelle la commande login
      });
    it('should show account title',()=>{
        cy.get('[routerlink="me"]').click()
        cy.get('h1').should("contain","User information")
        

        
    })
})