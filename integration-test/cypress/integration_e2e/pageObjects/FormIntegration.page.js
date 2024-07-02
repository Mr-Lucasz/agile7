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
    cy.intercept("POST", "http://localhost:3000/api/form", (req) => {
      req.reply((res) => {
        // Simula a validação dos dados
        if (req.body.email === "") {
          res.send({
            statusCode: 400,
            body: { message: "Validation failed" }
          });
        } else {
          res.send({
            statusCode: 200,
            body: {
              message: "Success",
              emailStatus: "Email sent successfully"
            }
          });
        }
      });
    }).as("handleFormSubmission");
    cy.get(formElements.submitButton).click();
  },
  submitFormWithValidationFailure: () => {
    cy.intercept("POST", "http://localhost:3000/api/form", (req) => {
      req.reply({
        statusCode: 400,
        body: { message: "Validation failed" }
      });
    }).as("handleFormSubmission");
    cy.get(formElements.submitButton).click();
  },
  checkValidationSuccess: () => {
    cy.wait("@handleFormSubmission", { timeout: 10000 }).then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
      expect(interception.response.body.message).to.equal("Success");
    });
  },
  checkValidationFailure: () => {
    cy.wait("@handleFormSubmission", { timeout: 10000 }).then((interception) => {
      expect(interception.response.statusCode).to.equal(400);
      expect(interception.response.body.message).to.equal("Validation failed");
    });
  },
  checkSnackbarSuccess: () => {
    cy.get(".MuiSnackbar-root").should('contain', 'Formulário enviado com sucesso!');
  },
  checkSnackbarNotDisplayed: () => {
    cy.get(".MuiSnackbar-root").should('not.exist');
  },

  checkWhatsappButton: () => {
    cy.get('#btn-contato').should('be.visible');
  },
    // Then a API de redirecionamento para o WhatsApp deve ser chamada
 checkLinkToWhatsapp: () => {
    cy.get('#btn-contato').should('have.attr', 'href', 'https://api.whatsapp.com/send/?phone=5594981183574&text=Ol%C3%A1%2C+Agile7%21+Tenho+um+ideia+para+um+projeto.+Podemos+conversar%3F&type=phone_number&app_absent=0');
  },
  //    And o usuário deve ser redirecionado para o aplicativo do WhatsApp
  redirectToWhatsapp: () => {
    cy.get('#btn-contato').click();
    cy.url().should('include', 'https://api.whatsapp.com/send/?phone=5594981183574&text=Ol%C3%A1%2C+Agile7%21+Tenho+um+ideia+para+um+projeto.+Podemos+conversar%3F&type=phone_number&app_absent=0');
  },
  //valide msg pre formatato link api,     And uma mensagem pré-formatada deve ser preenchida no campo de mensagem do WhatsApp
  checkPreformattedMessage: () => {
    cy.get('#btn-contato').click();
    cy.url().should('include', 'Ol%C3%A1%2C+Agile7%21+Tenho+um+ideia+para+um+projeto.+Podemos+conversar%3F');
  },  
  
};

export default formIntegration;