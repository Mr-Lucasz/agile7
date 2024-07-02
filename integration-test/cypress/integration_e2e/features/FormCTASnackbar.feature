Feature: Checar se a snackbar de sucesso aparece após envio do formulário para o servidor

Scenario Outline: Exibição de snackbar de sucesso após envio do formulário
  Given o form está preenchido <statusPreenchimento>
  When o usuário clica no botão de confirmação
  And a API de armazenamento está <statusAPIArmazenamento>
  Then os dados devem ser <statusArmazenamento>
  And a snackbar de sucesso deve ser <statusSnackbar>

Examples:
  | statusPreenchimento | statusAPIArmazenamento | statusArmazenamento | statusSnackbar |
  | corretamente         | operacional            | armazenados         | exibida        |
  | corretamente         | não operacional        | não armazenados     | não exibida    |
  | incorretamente       | operacional            | não armazenados     | não exibida    |
  | incorretamente       | não operacional        | não armazenados     | não exibida    |
