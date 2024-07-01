import { mount } from "@cypress/react";
import { FormCTA } from "../../src/components/FormCTA";



describe("FormCTA Integration Tests", () => {
  const apiUrl = "http://localhost:3000/api/form";
  const formData = {
    nome: "João da Silva",
    email: "joao.silva@example.com",
    telefone: "11987654321",
    empresa: "AGILE7 TECH",
    mensagem: "Olá, gostaria de saber mais sobre os serviços da AGILE7 TECH.",
  };

  beforeEach(() => {
    // Visita a página onde o formulário está localizado
    cy.visit("/");
  });

  it("RT09-1: Submissão bem-sucedida", () => {
    cy.intercept("POST", apiUrl, (req) => {
      req.reply((res) => {
        res.send({ statusCode: 200, body: { message: "Success" } });
      });
    }).as("handleFormSubmission");

    // Preenche o formulário
    cy.get("#nome").type(formData.nome);
    cy.get("#email").type(formData.email);
    cy.get("#telefone").type(formData.telefone);
    cy.get("#empresa").type(formData.empresa);
    cy.get("#mensagem").type(formData.mensagem);
    cy.get("checkbox").check("true");

    // Submete o formulário
    cy.get("#submit-button").click();

    // Verifica se a função handleFormSubmission foi chamada com sucesso
    cy.wait("@handleFormSubmission")
      .its("response.statusCode")
      .should("eq", 200);
  });

  it("RT09-2: Falha na API de armazenamento", () => {
    cy.intercept("POST", apiUrl, (req) => {
      req.reply((res) => {
        res.send({ statusCode: 500, body: { message: "Server Error" } });
      });
    }).as("handleFormSubmission");

    // Preenche o formulário
    cy.get("#nome").type(formData.nome);
    cy.get("#email").type(formData.email);
    cy.get("#telefone").type(formData.telefone);
    cy.get("#empresa").type(formData.empresa);
    cy.get("#mensagem").type(formData.mensagem);
    cy.get("checkbox").check("true");

    // Submete o formulário
    cy.get("#submit-button").click();

    // Verifica se a API de armazenamento falhou
    cy.wait("@handleFormSubmission")
      .its("response.statusCode")
      .should("eq", 500);
  });

  it("RT09-3: Falha no serviço de envio de e-mails", () => {
    cy.intercept("POST", apiUrl, (req) => {
      // Simula uma falha no envio de e-mail dentro da função de submissão
      req.reply((res) => {
        res.send({ statusCode: 500, body: { message: "Email Service Error" } });
      });
    }).as("handleFormSubmission");

    // Preenche o formulário
    cy.get("#nome").type(formData.nome);
    cy.get("#email").type(formData.email);
    cy.get("#telefone").type(formData.telefone);
    cy.get("#empresa").type(formData.empresa);
    cy.get("#mensagem").type(formData.mensagem);
    cy.get("checkbox").check("true");

    // Submete o formulário
    cy.get("#submit-button").click();

    // Verifica se houve falha no serviço de envio de e-mails
    cy.wait("@handleFormSubmission")
      .its("response.statusCode")
      .should("eq", 500);
  });

  it("RT09-4: Formulário não preenchido corretamente", () => {
    // Submete o formulário sem preencher os campos
    cy.get("#submit-button").click();

    // Verifica que a função handleFormSubmission não foi chamada
    cy.intercept("POST", apiUrl).as("handleFormSubmission");
    cy.get("@handleFormSubmission.all").should("have.length", 0);
  });
});
