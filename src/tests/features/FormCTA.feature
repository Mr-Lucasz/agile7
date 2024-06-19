Feature: Validação do campo "Nome" no formulário de captação de leads

  Scenario: Nome vazio
    Given o usuário está na página de captação de leads
    When o usuário submete o formulário sem preencher o campo "Nome"
    Then o sistema deve exibir uma mensagem de erro indicando que o campo "Nome" é obrigatório

  Scenario: Nome preenchido
    Given o usuário está na página de captação de leads
    When o usuário preenche o campo "Nome" com "João"
    And o usuário submete o formulário
    Then o sistema não deve exibir nenhuma mensagem de erro