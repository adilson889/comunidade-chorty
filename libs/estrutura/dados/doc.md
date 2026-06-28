```markdown
# Estrutura de Dados (ed)

## Conceito

A biblioteca `estrutura.dados` permite escrever SQL em portugues puro dentro do codigo Chorty. SELECT, INSERT, UPDATE, DELETE, criacao de tabelas, indices e transaccoes — tudo em portugues, sem escrever uma unica linha de SQL.

## Como funciona

Cada funcao da biblioteca gera uma instrucao SQL valida e executa-a atraves do motor de base de dados configurado. Por padrao, o SQL gerado e mostrado na consola. Quando um motor de base de dados real estiver ligado (ex: SQLite no navegador), as consultas sao executadas diretamente.

## Instalacao

```chorty
usar biblioteca estrutura.dados ed
```

Consultas (SELECT)

ed.selecionar(tabela, opcoes)

Consulta dados de uma tabela.

· tabela — Nome da tabela
· opcoes — Mapa com campos, onde, ordenar, limite, etc. (opcional)

Retorno: lista com os registos encontrados.

```chorty
todos = ed.selecionar("utilizadores")
adultos = ed.selecionar("utilizadores", ed.mapa({
  "onde": ed.mapa({"idade": ed.maior_ou_igual(18)}),
  "ordenar_por": "nome",
  "limite": 10
}))
```

ed.contar(tabela, campo)

Conta registos de uma tabela.

· tabela — Nome da tabela
· campo — Campo a contar (opcional; padrao: todos)

Retorno: numero com o total de registos.

```chorty
total = ed.contar("utilizadores")
```

ed.somar(tabela, campo)

Soma os valores de um campo.

```chorty
totalSalarios = ed.somar("utilizadores", "salario")
```

ed.media(tabela, campo)

Calcula a media dos valores de um campo.

```chorty
mediaIdade = ed.media("utilizadores", "idade")
```

ed.minimo(tabela, campo) / ed.maximo(tabela, campo)

Retorna o valor minimo ou maximo de um campo.

```chorty
menor = ed.minimo("utilizadores", "idade")
maior = ed.maximo("utilizadores", "idade")
```

ed.distintos(tabela, campo)

Retorna os valores unicos de um campo.

```chorty
cidades = ed.distintos("utilizadores", "cidade")
```

Manipulacao de dados

ed.inserir(tabela, dados)

Insere um novo registo na tabela.

· tabela — Nome da tabela
· dados — Mapa com os valores a inserir

Retorno: identificador do registo inserido.

```chorty
ed.inserir("utilizadores", ed.mapa({
  "nome": "Adilson",
  "idade": 25
}))
```

ed.inserir_varios(tabela, lista)

Insere varios registos de uma vez.

· tabela — Nome da tabela
· lista — Lista de mapas com os valores

```chorty
ed.inserir_varios("utilizadores", [
  ed.mapa({"nome": "Ana", "idade": 30}),
  ed.mapa({"nome": "Joao", "idade": 28})
])
```

ed.actualizar(tabela, dados, opcoes)

Atualiza registos existentes.

· tabela — Nome da tabela
· dados — Mapa com os novos valores
· opcoes — Mapa com a condicao onde

Retorno: numero de registos atualizados.

```chorty
ed.actualizar("utilizadores",
  ed.mapa({"idade": 26}),
  ed.mapa({"onde": ed.mapa({"nome": "Adilson"})})
)
```

ed.apagar(tabela, opcoes)

Remove registos da tabela.

· tabela — Nome da tabela
· opcoes — Mapa com a condicao onde (opcional; sem condicao apaga tudo)

Retorno: numero de registos removidos.

```chorty
ed.apagar("utilizadores", ed.mapa({"onde": ed.mapa({"id": 5})}))
```

Estrutura de tabelas

ed.criar_tabela(nome, colunas)

Cria uma nova tabela.

· nome — Nome da tabela
· colunas — Mapa com a definicao das colunas

```chorty
ed.criar_tabela("utilizadores", ed.mapa({
  "id": ed.inteiro(ed.mapa({"primario": verdadeiro, "auto_incremento": verdadeiro})),
  "nome": ed.texto(ed.mapa({"obrigatorio": verdadeiro})),
  "email": ed.texto(ed.mapa({"unico": verdadeiro})),
  "idade": ed.inteiro(ed.mapa({}))
}))
```

ed.apagar_tabela(nome)

Remove uma tabela completamente.

```chorty
ed.apagar_tabela("utilizadores")
```

ed.apagar_tabela_se_existir(nome)

Remove a tabela apenas se existir.

```chorty
ed.apagar_tabela_se_existir("temporaria")
```

ed.adicionar_coluna(tabela, nome, coluna)

Adiciona uma nova coluna a uma tabela existente.

```chorty
ed.adicionar_coluna("utilizadores", "telefone", ed.texto(ed.mapa({})))
```

ed.remover_coluna(tabela, nome)

Remove uma coluna da tabela.

```chorty
ed.remover_coluna("utilizadores", "telefone")
```

Indices

ed.criar_indice(tabela, campo)

Cria um indice simples numa coluna.

```chorty
ed.criar_indice("utilizadores", "nome")
```

ed.criar_indice_unico(tabela, campo)

Cria um indice unico (valores nao podem repetir-se).

```chorty
ed.criar_indice_unico("utilizadores", "email")
```

Juncoes (JOIN)

ed.juntar(tabela, origem, destino)

Juncao interna (INNER JOIN).

```chorty
dados = ed.selecionar("utilizadores", ed.mapa({
  "campos": ["utilizadores.nome", "posts.titulo"],
  "juntar": ed.juntar("posts", "utilizadores.id", "posts.utilizador_id")
}))
```

ed.juntar_esquerda(tabela, origem, destino)

Juncao a esquerda (LEFT JOIN).

ed.juntar_direita(tabela, origem, destino)

Juncao a direita (RIGHT JOIN).

Transaccoes

ed.transacao(funcao)

Executa varias operacoes dentro de uma transacao. Se alguma falhar, tudo e revertido.

```chorty
ed.transacao(funcao()
  ed.inserir("utilizadores", ed.mapa({"nome": "Ana"}))
  ed.inserir("posts", ed.mapa({"titulo": "Ola", "utilizador_id": 1}))
fim)
```

ed.reverter()

Reverte a transacao atual manualmente.

```chorty
ed.reverter()
```

Operadores

A biblioteca fornece operadores para usar nas condicoes onde:

Operador Funcao
ed.igual(v) =
ed.diferente(v) !=
ed.maior_que(v) >
ed.menor_que(v) <
ed.maior_ou_igual(v) >=
ed.menor_ou_igual(v) <=
ed.entre(a, b) BETWEEN a AND b
ed.em(lista) IN (...)
ed.contem(v) LIKE '%v%'
ed.comeca_com(v) LIKE 'v%'
ed.termina_com(v) LIKE '%v'
ed.e_nulo() IS NULL
ed.nao_e_nulo() IS NOT NULL
ed.e(a, b) AND
ed.ou(a, b) OR
ed.nao(c) NOT

Tipos de coluna

Funcao SQL
ed.inteiro(opcoes) INTEGER
ed.texto(opcoes) TEXT
ed.decimal_tipo(opcoes) REAL
ed.logico_tipo(opcoes) BOOLEAN
ed.data_tipo(opcoes) DATE

Opcoes disponiveis para cada tipo: primario, auto_incremento, obrigatorio, unico, padrao.

Exemplo completo

```chorty
app "Sistema com Base de Dados"

config
  saida = "app"
  importar elementosUI
  importar reatividade
  usar biblioteca estrutura.dados ed
fim

tela "Home"
  cabecalho
    titulo "Base de Dados"
  fim
  secao espaco=20
    botao "Criar Tabela" tipo="verde" largura="completa" acao=criar
    botao "Inserir" tipo="azul" largura="completa" acao=adicionar
    botao "Listar" tipo="cinza" largura="completa" acao=listar
    texto "{resultado}"
  fim
fim

logica

dados
  resultado: texto = ""
fim

funcao criar()
  ed.criar_tabela("utilizadores", ed.mapa({
    "id": ed.inteiro(ed.mapa({"primario": verdadeiro})),
    "nome": ed.texto(ed.mapa({}))
  }))
  resultado = "Tabela criada!"
fim

funcao adicionar()
  ed.inserir("utilizadores", ed.mapa({"nome": "Adilson"}))
  resultado = "Registo adicionado!"
fim

funcao listar()
  registos = ed.selecionar("utilizadores")
  resultado = texto(registos)
fim

fim

fim
```

Resumo

A biblioteca estrutura.dados transforma o Chorty numa linguagem capaz de gerir bases de dados relacionais. Todas as operacoes SQL comuns estao disponiveis com nomes em portugues, permitindo criar, consultar, atualizar e apagar dados sem nunca escrever SQL diretamente. E a base para aplicacoes com persistencia de dados no ecossistema Chorty.

```