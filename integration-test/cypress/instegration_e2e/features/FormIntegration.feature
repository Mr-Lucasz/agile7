

Feature: Formulário de Captação de Leads Integração


Scenario: Submissão bem-sucedida

Given que o formulário de captação de leads está preenchido corretamente
When o usuário clica no botão de submissão
Then os dados devem ser enviados para a API de armazenamento
And um e-mail de notificação deve ser enviado
