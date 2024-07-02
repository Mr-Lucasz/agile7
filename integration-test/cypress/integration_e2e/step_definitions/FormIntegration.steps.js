import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import formIntegration from "../pageObjects/FormIntegration.page";

Given("que o formulário de captação de leads está preenchido corretamente", function () {
  formIntegration.fillForm();
});

When("o usuário clica no botão de submissão", () => {
  formIntegration.submitForm();
});

Then("os dados devem ser enviados para a API de armazenamento", () => {
  formIntegration.submitFormSucessfully();
});

Then("um e-mail de notificação deve ser enviado", () => {
  formIntegration.checkEmailNotification();
});