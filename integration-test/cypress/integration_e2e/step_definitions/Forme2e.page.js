import { Given, When, Then, And } from "@badeball/cypress-cucumber-preprocessor";
import formE2e from "../pageObjects/Forme2e.page";

Given("que eu estou na landing page", () => {
  formE2e.visit();
});

When("eu preencho todos os campos do formulário de captação de leads", () => {
    formE2e.fillForm();
});

When("seleciono o checkbox de confirmação de compartilhamento de dados", () => {
    formE2e.checkboxValidation();

});

When("clico no botão de submissão", () => {
    formE2e.submitForm();
});

Then("os dados devem ser armazenados no servidor", () => {
    formE2e.checkServerResponse();
});

Then("um e-mail deve ser enviado ao vendedor notificando sobre o novo lead", () => {
    formE2e.checkEmailNotification();
});

Then("uma mensagem de confirmação deve ser exibida na tela", () => {
    formE2e.checkSnackbarSuccess();
});

When("eu verifico se a página está dividida em três seções: Sobre Nós, Nossos Serviços e Para Clientes", () => {
    formE2e.checkPageSections();
});

When("rolo a página para baixo da seção Sobre Nós até Nossos Serviços", () => {
    formE2e.scrollToSection("#section2");
});

When("rolo a página para baixo da seção Nossos Serviços até Para Clientes", () => {
    formE2e.scrollToSection("#section3");
});

Then("eu devo ver as três seções distintas", () => {
    formE2e.checkPageSections();
});

Then("devo conseguir navegar entre elas sem problemas", () => {
  cy.get('#section1').should('be.visible');
  cy.get('#section2').should('be.visible');
  cy.get('#section3').should('be.visible');
});