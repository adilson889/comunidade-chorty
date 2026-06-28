```markdown
# Autenticacao (au)

## Conceito

A biblioteca `autenticacao` permite gerir utilizadores e sessoes de forma simples usando o armazenamento local do navegador (localStorage). Nao precisa de servidor, base de dados ou internet.

## Como funciona

Quando um utilizador se regista, os dados sao guardados no localStorage do navegador na chave `au_users`. Quando inicia sessao, e criada uma chave `au_sessao` com os dados da sessao ativa. Estes dados persistem mesmo depois de fechar o navegador, ate que o utilizador termine a sessao ou limpe os dados do navegador.

## Instalacao

No inicio do codigo Chorty, importa a biblioteca com o alias `au`:

```

usar biblioteca autenticacao au

```

## Funcoes

### au.registar(email, senha, nome)

Cria uma nova conta de utilizador.

Parametros:
- email — Endereco de email do utilizador
- senha — Palavra-passe da conta
- nome — Nome a apresentar (opcional; se nao for informado, usa o email)

Retorno: um mapa com a propriedade `sucesso` (verdadeiro ou falso). Em caso de sucesso, inclui `mensagem`. Em caso de erro, inclui `erro` com a descricao do problema (ex: "Email ja registado").

```

r = au.registar("adilson@email.com", "123456", "Adilson")
se r.sucesso
mensagem(r.mensagem)
senao
mensagem(r.erro)
fim

```

### au.entrar(email, senha)

Inicia sessao com um utilizador ja registado.

Parametros:
- email — Email da conta
- senha — Palavra-passe

Retorno: um mapa com `sucesso`, `nome` e `email` em caso de login bem-sucedido, ou `sucesso` falso e `erro` com a descricao ("Email nao encontrado" ou "Senha incorreta").

```

r = au.entrar("adilson@email.com", "123456")
se r.sucesso
nomeUtilizador = r.nome
mensagem("Bem-vindo, " + r.nome + "!")
senao
mensagem(r.erro)
fim

```

### au.sair()

Termina a sessao atual. Remove os dados da sessao do localStorage. Nao recebe parametros nem retorna valor.

```

au.sair()

```

### au.estaLogado()

Verifica se existe uma sessao ativa no momento.

Retorno: `verdadeiro` se houver sessao, `falso` caso contrario. Util para decidir se o utilizador ve a tela de login ou o painel principal.

```

se au.estaLogado()
mensagem("Sessao ativa")
senao
mensagem("Nenhuma sessao")
fim

```

### au.nome()

Retorna o nome do utilizador atualmente com sessao iniciada.

Retorno: texto com o nome, ou texto vazio se nao houver sessao. Ideal para personalizar a interface com o nome do utilizador.

```

texto "Ola, {au.nome()}!"

```

### au.email()

Retorna o email do utilizador da sessao atual.

Retorno: texto com o email, ou vazio se nao houver sessao.

```

email = au.email()

```

### au.utilizador()

Retorna um mapa com todos os dados do utilizador da sessao atual: `email`, `nome`, `senha` e `data` de registo. Retorna `nulo` se nao houver sessao.

```

dados = au.utilizador()
se dados != nulo
mensagem("Registado em: " + dados.data)
fim

```

## Exemplo completo

Um sistema com tres telas: Registo, Login e Painel. A navegacao usa `irParaNomeTela`.

```

app "Sistema Autenticacao"

config
saida = "app"
importar elementosUI
importar reatividade
usar biblioteca autenticacao au
fim

tela "Login"
cabecalho
titulo "Entrar"
fim
secao espaco=24
entrada "email@exemplo.com" tipo="email" rotulo="Email" ligar=email
entrada "Senha" tipo="senha" rotulo="Senha" ligar=senha
texto "{mensagemErro}"
botao "Entrar" tipo="verde" largura="completa" acao=fazerLogin
fim
secao espaco=16
botao "Criar conta" tipo="transparente" posicao="centro" acao=irParaRegisto
fim
fim

tela "Registo"
cabecalho
titulo "Criar Conta"
fim
secao espaco=24
entrada "Nome" tipo="texto" rotulo="Nome" ligar=nome
entrada "email@exemplo.com" tipo="email" rotulo="Email" ligar=email
entrada "Senha" tipo="senha" rotulo="Senha" ligar=senha
botao "Registar" tipo="verde" largura="completa" acao=fazerRegisto
fim
secao espaco=16
botao "Voltar" tipo="transparente" posicao="centro" acao=irParaLogin
fim
fim

tela "Painel"
cabecalho
titulo "Painel"
fim
secao espaco=24
titulo "Bem-vindo, {nomeUtilizador}!"
texto "Email: {emailUtilizador}"
botao "Terminar Sessao" tipo="vermelho" largura="completa" acao=terminar
fim
fim

logica

dados
email: texto = ""
senha: texto = ""
nome: texto = ""
nomeUtilizador: texto = ""
emailUtilizador: texto = ""
mensagemErro: texto = ""
fim

funcao fazerLogin()
se email == "" ou senha == ""
mensagemErro = "Preenche todos os campos"
retornar
fim
r = au.entrar(email, senha)
se r.sucesso
nomeUtilizador = r.nome
emailUtilizador = r.email
mensagemErro = ""
senao
mensagemErro = r.erro
fim
fim

funcao fazerRegisto()
se nome == "" ou email == "" ou senha == ""
mensagem("Preenche todos os campos")
retornar
fim
r = au.registar(email, senha, nome)
se r.sucesso
mensagem(r.mensagem)
senao
mensagem(r.erro)
fim
fim

funcao terminar()
au.sair()
nomeUtilizador = ""
emailUtilizador = ""
mensagem("Sessao terminada")
fim

fim

fim

```

## Resumo

A biblioteca `autenticacao` oferece um sistema de registo e login completo sem depender de um servidor. Os dados ficam guardados no proprio navegador do utilizador, permitindo que a app funcione offline e mantenha a sessao entre utilizacoes. E ideal para aplicacoes pessoais, prototipos e sistemas simples que nao precisam de backend.
```