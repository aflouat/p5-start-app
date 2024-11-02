describe('tests e2e pour les sessions de yoga',()=>{
    let token; // Variable pour stocker le token

    before(() => {
       // Obtenir le token de manière asynchrone et l'utiliser dans les tests
       cy.loginAndGetToken().then((authToken) => {
        token = authToken; // Stocke le token dans la variable `token`
        cy.log('Token récupéré : ' + token);
         // Utilise le token pour créer une session
      });
    });
      it('should create new session',()=>{
        cy.contains('Create').click();
        cy.get('#mat-input-2').type('Top session Yoga');
        cy.get('#mat-input-3').type('2024-11-01');
        // Ouvre la dropdown
        cy.get('mat-select[formcontrolname="teacher_id"]').click();
        // Vérifie si l'option avec l'ID 1 est présente et la sélectionne
        cy.get('mat-option').each(($el) => {
          if ($el.attr('ng-reflect-value') === '1') {
            cy.wrap($el).click();
          }

        });

        cy.get('#mat-input-4').type('Ce programme es conçu pour offrir une expérience de bien-être complète, '
          +'axée sur des enchaînements fluides et harmonieux. Il vise à améliorer la flexibilité, '
          +'la force et la relaxation à travers des séances adaptées à différents niveaux de pratique.');
          cy.get('.mt2 > [fxlayout="row"] > .mat-focus-indicator').click();

      });


      it('should show list sessions, session details and then delete session created ', ()=>{
       cy.login();
       cy.get('[ng-reflect-router-link="detail,1"]').click();
       cy.get(':nth-child(2) > .mat-focus-indicator').click();

      })

})