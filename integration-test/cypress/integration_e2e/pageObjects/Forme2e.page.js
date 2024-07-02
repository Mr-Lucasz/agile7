import { formElements } from "../elements";

let lastSubmissionResponse = null;

const formE2e = {
  visit: () => {
    cy.visit("http://localhost:4000/");
  },
  fillForm: () => {
    cy.get(formElements.nomeInput).type("Carlos Santos");
    cy.get(formElements.emailInput).type("carlos.santos@example.com");
    cy.get(formElements.telefoneInput).type("31987654321");
    cy.get(formElements.empresaInput).type("Empresa Teste");
    cy.get(formElements.mensagemInput).type("Mensagem Teste");
  },
  checkboxValidation: () => {
    cy.get(formElements.checkbox).check();  
  },

  submitForm: () => {
    cy.intercept("POST", "http://localhost:3000/api/form").as("handleFormSubmission");
    cy.get(formElements.submitButton).click();
  },

  checkServerResponse: () => {
    cy.wait("@handleFormSubmission", { timeout: 10000 }).then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
      expect(interception.response.body.message).to.equal("Success");
      lastSubmissionResponse = interception.response.body; 
    });
  },
  checkEmailNotification: () => {
      expect(lastSubmissionResponse).to.not.be.null; 
      expect(lastSubmissionResponse.emailStatus).to.equal("Email sent successfully");
  },
  checkSnackbarSuccess: () => {
    cy.get('.MuiSnackbar-root').should('contain', 'Formulário enviado com sucesso!');
  },
  checkPageSections: () => {
    cy.get("#section1").should('exist');
    cy.get("#section2").should('exist');
    cy.get("#section3").should('exist');
  },
  scrollToSection: (section) => {
    cy.get(section).scrollIntoView();
  },
};

export default formE2e;