import { formElements } from "../elements";

formIntegration = {
  //Given que o formulário de captação de leads está preenchido corretamente
  fillForm: () => {
    cy.visit(Cypress.env("BASE_URL"));
    cy.get(formElements.nomeInput).type("Nome Teste");
    cy.get(formElements.emailInput).type("email@teste.com");
    cy.get(formElements.telefoneInput).type("11999999999");
    cy.get(formElements.empresaInput).type("Empresa Teste");
    cy.get(formElements.mensagemInput).type("Mensagem Teste");
    cy.get(formElements.checkbox).check();
  },
  // When o usuário clica no botão de submissão
  submitForm: () => {
    // Intercepta a requisição da API e simula uma resposta bem-sucedida
    cy.intercept("POST", Cypress.env(API_URL), (req) => {
      req.reply((res) => {
        res.send({ statusCode: 200, body: { message: "Success" } });
      });
    }).as("handleFormSubmission");
    cy.get(formElements.submitButton).click();
  },
  // Then o formulário é submetido com sucesso
  submitFormSucessfully: () => {
    cy.wait("@handleFormSubmission").then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
      expect(interception.response.body.message).to.equal("Success");
    });
  },
  //And um e-mail de notificação deve ser enviado
  checkEmailNotification: () => {
    cy.wait("@handleFormSubmission").then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
      expect(interception.response.body.emailStatus).to.equal("Email sent successfully");
    });
  }

};

export default formIntegration;
