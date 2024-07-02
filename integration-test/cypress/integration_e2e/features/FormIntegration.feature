Feature: Formulário de Captação de Leads Integração

Scenario: Submissão bem-sucedida
  Given que o formulário de captação de leads está preenchido corretamente
  When o usuário clica no botão de submissão
  Then os dados devem ser enviados para a API de armazenamento
  And um e-mail de notificação deve ser enviado

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