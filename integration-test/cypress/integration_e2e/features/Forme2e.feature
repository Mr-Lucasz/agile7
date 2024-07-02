Feature: Fluxo Completo de Preenchimento

Scenario: Fluxo Completo de Preenchimento e Submissão do Formulário de Captação de Leads
  Given que eu estou na landing page
  When eu preencho todos os campos do formulário de captação de leads
  And seleciono o checkbox de confirmação de compartilhamento de dados
  And clico no botão de submissão
  Then os dados devem ser armazenados no servidor
  And um e-mail deve ser enviado ao vendedor notificando sobre o novo lead
  And uma mensagem de confirmação deve ser exibida na tela

Scenario: Visualização e Navegação das Seções da Landing Page
  Given que eu estou na landing page
  When eu verifico se a página está dividida em três seções: Sobre Nós, Nossos Serviços e Para Clientes
  And rolo a página para baixo da seção Sobre Nós até Nossos Serviços
  And rolo a página para baixo da seção Nossos Serviços até Para Clientes
  Then eu devo ver as três seções distintas
  And devo conseguir navegar entre elas sem problemas