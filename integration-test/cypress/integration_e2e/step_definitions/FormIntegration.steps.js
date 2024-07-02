import { Given, When, Then, And } from "@badeball/cypress-cucumber-preprocessor";
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

When("a API de armazenamento falha", () => {
  formIntegration.submitFormWithStorageFailure();
});

Then("os dados não devem ser armazenados devido à falha na API de armazenamento", () => {
  formIntegration.checkStorageAPIFailure();
});

When("a API de armazenamento é bem-sucedida", () => {
  formIntegration.submitFormSucessfully();
});

Then("os dados devem ser armazenados, mas o e-mail de notificação não deve ser enviado devido à falha no serviço de envio de e-mails", () => {
  formIntegration.submitFormWithEmailFailure();
});

Given("que o formulário de captação de leads não está preenchido corretamente", function () {
  formIntegration.fillFormIncorrectly();
});

Then("os dados não devem ser enviados para a API de armazenamento", () => {
  formIntegration.checkFormValidation();
});

Then("a API de validação deve ser chamada", () => {
  formIntegration.submitFormWithValidation();
});

Then("a validação é bem-sucedida", () => {
  formIntegration.checkValidationSuccess();
});

Then("se a validação for bem-sucedida, os dados devem ser armazenados", () => {
  formIntegration.checkValidationSuccess();
});

Then("os dados não devem ser armazenados devido à falha na validação", () => {
  formIntegration.checkValidationFailure();
});