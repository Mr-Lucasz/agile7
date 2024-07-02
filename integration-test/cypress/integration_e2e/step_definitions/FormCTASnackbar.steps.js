import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import formIntegrationCTA from "../pageObjects/FormCTASnackbar.page.js";

Given("o form está preenchido {string}", (statusPreenchimento) => {
  if (statusPreenchimento === "corretamente") {
    formIntegrationCTA.fillFormCorrectly();
  } else {
    formIntegrationCTA.fillFormIncorrectly();
  }
});

When("o usuário clica no botão de confirmação", () => {
  formIntegrationCTA.submitForm("operacional");
});

When("a API de armazenamento está {string}", (statusAPIArmazenamento) => {
  formIntegrationCTA.submitForm(statusAPIArmazenamento);
});

Then("os dados devem ser {string}", (statusArmazenamento) => {
  if (statusArmazenamento === "armazenados") {
    formIntegrationCTA.submitFormSuccessfully();
  } else {
    formIntegrationCTA.checkStorageAPIFailure();
  }
});

Then("a snackbar de sucesso deve ser {string}", (statusSnackbar) => {
  const shouldBeVisible = statusSnackbar === "exibida";
  formIntegrationCTA.checkSnackbarVisibility(shouldBeVisible);
});
