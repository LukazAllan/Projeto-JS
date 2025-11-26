# Projeto-JS
## 2ª Avaliação
O aluno deve realizar a implementação da API para realizar a inserção de mensagens e a criação de ambiente de leitura das mensagens recebidas (apenas por pessoas autorizadas);

Inicialmente, o aluno deve importar em todas as páginas que for fazer implementação, os seguintes scripts, na mesma ordem que apresentado abaixo:
```html
<script src="js/jquery-3.6.4.min.js"></script>
<script src="js/api.js"></script>
```

### 1ª Implementação:

Na página de contato, deve ser implementada a função de "Enviar Mensagem", por meio do uso da função inserirMensagem(mensagem) (presente no arquivo api.js). Deve ser obtidos os valores dos campos do formulário
referente ao Nome, Email e Mensagem e gerar um objeto no seguinte formato:
```js
var mensagem = {
            nome: "nome da pessoa",
            email: "email informado",
            mensagem: "a mensagem informada"
} 
```
Destaca-se que os valores dos campos do objeto deve ser preenchidos com o valores informados nos campos dos formulário.

Após gerado o objeto de mensagem, deve ser utilizada a função inserirMensagem() passando como parâmetro o objeto criado.

### 2ª Implementação:

Deve ser criada uma nova página chamada admin.html, com um formulário e dois campos: E-mail e Senha. Essa página deve autenticar o e-mail e senha informado por meio da função validarUsuario(objLoginSenha) (presente no arquivo api.js). Essa função retorna o valor True, caso o e-mail e senha estejam corretos, e False, caso contrário. 

Se os dados estiverem corretos, a página deve ser redirecionada para uma nova página chamada mensagens.html, senão, mostrar uma mensagem informando "E-mail e Senha inválidos".

Lembrando que a função validarUsuario() ele exige um parâmetro do tipo objeto, com a seguinte estrutura:
```js
var objLoginSenha = {
            email: "email informado",
            senha: "senha informada"
} 
```
Usuário e senha válido: 
`email: admin@admin.com`
`//senha: '1234'`

Destaca-se que os valores dos campos do objeto deve ser preenchidos com o valores informados nos campos dos formulário.

### 3ª Implementação

Deve ser criada uma nova página chamada `mensagens.html`. Essa página deve exibir todas as mensagens já recebidas, disponíveis utilizando a  função `obterMensagens()`. Essa função retorna um Array de objetos  contendo as mensagens. Deve ser criada uma tabela, de forma dinâmica, com os dados recebidos. Cada linha da tabela deve ser preenchida da com objeto do Array de mensagens. Uma vez que as mensagens foram recebidas, elas devem ser gravadas localmente no browser e a lista deve ser sempre atualizada quando novas mensagens forem adicionadas. Por padrão, todas as mensagem obtidas deve ser formatada com o texto em negrito, para destacar das demais como "não visualizada". Mensagem que já forem visualizadas deve ter a formatação da fonte sem negrito.

### 4ª Implementação

Para cada mensagem listada, deve ser disponibilizado um botão de "Excluir Mensagem" e um botão de "Mensagem Visualizada". O botão de excluir a mensagem deve, de fato, excluir a mensagem selecionada. O botão "Mensagem Visualizada" deve "marcar" a mensagem como "visualizada" e dessa forma formatar a mensagem com fonte normal (retirar o negrito). As funções de Excluir Mensagem e Mensagem Visualizada deve, obrigatoriamente, solicitar a confirmação do usuário antes de ter sua efetividade.
