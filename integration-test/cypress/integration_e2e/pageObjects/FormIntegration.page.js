import { formElements } from "../elements";

let lastSubmissionResponse = null;

const formIntegration = {
  fillForm: () => {
    cy.visit("http://localhost:4000/");
    cy.get(formElements.nomeInput).type("Nome Teste");
    cy.get(formElements.emailInput).type("email@teste.com");
    cy.get(formElements.telefoneInput).type("11999999999");
    cy.get(formElements.empresaInput).type("Empresa Teste");
    cy.get(formElements.mensagemInput).type("Mensagem Teste");
    cy.get(formElements.checkbox).check();
  },
  fillFormIncorrectly: () => {
    cy.visit("http://localhost:4000/");
    cy.get(formElements.nomeInput).type("Nome Teste");
    // Deixando o campo de email vazio para simular preenchimento incorreto
    cy.get(formElements.telefoneInput).type("11999999999");
    cy.get(formElements.empresaInput).type("Empresa Teste");
    cy.get(formElements.mensagemInput).type("Mensagem Teste");
    cy.get(formElements.checkbox).check();
  },
  submitForm: () => {
    cy.intercept("POST", "http://localhost:3000/api/form").as("handleFormSubmission");
    cy.get(formElements.submitButton).click();
  },
  submitFormSucessfully: () => {
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
  submitFormWithStorageFailure: () => {
    cy.intercept("POST", "http://localhost:3000/api/form", {
      statusCode: 500,
      body: { message: "Storage API failed" },
    }).as("handleFormSubmission");
    cy.get(formElements.submitButton).click();
  },
  checkStorageAPIFailure: () => {
    cy.wait("@handleFormSubmission", { timeout: 10000 }).then((interception) => {
      expect(interception.response.statusCode).to.equal(500);
      expect(interception.response.body.message).to.equal("Storage API failed");
    });
  },
  submitFormWithEmailFailure: () => {
    cy.intercept("POST", "http://localhost:3000/api/form", (req) => {
      req.reply((res) => {
        res.send({
          statusCode: 200,
          body: {
            message: "Success",
            emailStatus: "Email service failed"
          }
        });
      });
    }).as("handleFormSubmission");
    cy.get(formElements.submitButton).click();
  },
  checkFormValidation: () => {
    cy.get(formElements.emailInput).then(($input) => {
      expect($input[0].validationMessage).to.not.be.empty;
    });
  },
  submitFormWithValidation: () => {
    cy.intercept("POST", "http://localhost:3000/api/validate", {
      statusCode: 200,
      body: { message: "Validation success" },
    }).as("handleValidation");
    cy.intercept("POST", "http://localhost:3000/api/form").as("handleFormSubmission");
    cy.get(formElements.submitButton).click();
  },
  checkValidationSuccess: () => {
    cy.wait("@handleValidation", { timeout: 10000 }).then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
      expect(interception.response.body.message).to.equal("Validation success");
    });
    cy.wait("@handleFormSubmission", { timeout: 10000 }).then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
      expect(interception.response.body.message).to.equal("Success");
    });
  },
  submitFormWithValidationFailure: () => {
    cy.intercept("POST", "http://localhost:3000/api/form", {
      statusCode: 400,
      body: { message: "Validation failed" },
    }).as("handleValidationFailure");
    cy.get(formElements.submitButton).click();
  },
  checkValidationFailure: () => {
    cy.wait("@handleValidationFailure", { timeout: 10000 }).then((interception) => {
      expect(interception.response.statusCode).to.equal(400);
      expect(interception.response.body.message).to.equal("Validation failed");
    });
  },
};

export default formIntegration;