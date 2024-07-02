import { formElements } from "../elements";

const formIntegrationCTA = {
  fillFormCorrectly: () => {
    cy.visit("http://localhost:4000/");
    cy.get(formElements.nomeInput).type("Carlos Santos");
    cy.get(formElements.emailInput).type("carlos.santos@example.com");
    cy.get(formElements.telefoneInput).type("31987654321");
    cy.get(formElements.empresaInput).type("Empresa Teste");
    cy.get(formElements.mensagemInput).type("Mensagem Teste");
    cy.get(formElements.checkbox).check();
  },
  fillFormIncorrectly: () => {
    cy.visit("http://localhost:4000/");
    cy.get(formElements.nomeInput).type("Carlos Santos");
    // Deixando o campo de email vazio para simular preenchimento incorreto
    cy.get(formElements.telefoneInput).type("31987654321");
    cy.get(formElements.empresaInput).type("Empresa Teste");
    cy.get(formElements.mensagemInput).type("Mensagem Teste");
    cy.get(formElements.checkbox).check();
  },
  submitForm: (apiStatus) => {
    if (apiStatus === "operacional") {
      cy.intercept("POST", "http://localhost:3000/api/form", {
        statusCode: 200,
        body: { message: "Success" },
      }).as("handleFormSubmission");
    } else {
      cy.intercept("POST", "http://localhost:3000/api/form", {
        statusCode: 500,
        body: { message: "Storage API failed" },
      }).as("handleFormSubmission");
    }
    cy.get(formElements.submitButton).click();
  },
  submitFormSuccessfully: () => {
    cy.wait("@handleFormSubmission", { timeout: 10000 }).then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
      expect(interception.response.body.message).to.equal("Success");
    });
  },
  checkStorageAPIFailure: () => {
    cy.wait("@handleFormSubmission", { timeout: 10000 }).then((interception) => {
      expect(interception.response.statusCode).to.equal(500);
      expect(interception.response.body.message).to.equal("Storage API failed");
    });
  },
  checkSnackbarVisibility: (shouldBeVisible) => {
    if (shouldBeVisible) {
      cy.get('.MuiSnackbar-root').should('be.visible').and('contain', 'Formulário enviado com sucesso!');
    } else {
      cy.get('.MuiSnackbar-root').should('not.exist');
    }
  },
};

export default formIntegrationCTA;
