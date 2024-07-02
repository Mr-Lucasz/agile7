Feature: Formulário de Captação de Leads Integração

  Scenario: Submissão bem-sucedida
    Given que o formulário de captação de leads está preenchido corretamente
    When o usuário clica no botão de submissão
    Then os dados devem ser enviados para a API de armazenamento
    And um e-mail de notificação deve ser enviado

  @focus
  Scenario: Falha na API de armazenamento
    Given que o formulário de captação de leads está preenchido corretamente
    When o usuário clica no botão de submissão
    And a API de armazenamento falha
    Then os dados não devem ser armazenados devido à falha na API de armazenamento

  Scenario: Falha no serviço de envio de e-mails
    Given que o formulário de captação de leads está preenchido corretamente
    When o usuário clica no botão de submissão
    And a API de armazenamento é bem-sucedida
    Then os dados devem ser armazenados, mas o e-mail de notificação não deve ser enviado devido à falha no serviço de envio de e-mails

  Scenario: Formulário não preenchido corretamente
    Given que o formulário de captação de leads não está preenchido corretamente
    When o usuário clica no botão de submissão
    Then os dados não devem ser enviados para a API de armazenamento

  Scenario: Validação e armazenamento bem-sucedidos
    Given que o formulário de captação de leads está preenchido corretamente
    When o usuário clica no botão de submissão
    Then a API de validação deve ser chamada
    And se a validação for bem-sucedida, os dados devem ser armazenados

  Scenario: Falha na API de armazenamento após validação bem-sucedida
    Given que o formulário de captação de leads está preenchido corretamente
    When o usuário clica no botão de submissão
    And a API de armazenamento falha
    Then os dados não devem ser armazenados devido à falha na API de armazenamento

  Scenario: Falha na API de validação
    Given que o formulário de captação de leads está preenchido corretamente
    When o usuário clica no botão de submissão
    Then os dados não devem ser armazenados devido à falha na validação
    
  @focus
  Scenario: Redirecionamento para o WhatsApp
    Given que o usuário está na landing page
    When o usuário clica no botão de contato WhatsApp no header
    Then a API de redirecionamento para o WhatsApp deve ser chamada
    And o usuário deve ser redirecionado para o aplicativo do WhatsApp
    And uma mensagem pré-formatada deve ser preenchida no campo de mensagem do WhatsApp
