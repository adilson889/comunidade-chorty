# Estrutura de Dados (ed)

## Conceito

A biblioteca `estrutura.dados` permite escrever SQL em português puro dentro do código Chorty. SELECT, INSERT, UPDATE, DELETE, criação de tabelas, índices e transacções — tudo em português, sem escrever uma única linha de SQL.

## Como funciona

Cada função da biblioteca gera uma instrução SQL válida e executa-a através do motor de base de dados configurado. Por padrão, o SQL gerado é mostrado na consola. Quando um motor de base de dados real estiver ligado (ex: SQLite no navegador), as consultas são executadas directamente.

## Instalação

```chorty
usar biblioteca estrutura.dados ed
```

---

## Consultas (SELECT)

### ed.selecionar(tabela, opcoes)

Consulta dados de uma tabela.

- `tabela` — Nome da tabela
- `opcoes` — Mapa com campos, onde, ordenar, limite, etc. (opcional)

Retorno: lista com os registos encontrados.

```chorty
todos = ed.selecionar("utilizadores")
adultos = ed.selecionar("utilizadores", ed.mapa({
  "onde": ed.mapa({"idade": ed.maior_ou_igual(18)}),
  "ordenar_por": "nome",
  "limite": 10
}))
```

### ed.contar(tabela, campo)

Conta registos de uma tabela.

- `tabela` — Nome da tabela
- `campo` — Campo a contar (opcional; padrão: todos)

```chorty
total = ed.contar("utilizadores")
```

### ed.somar(tabela, campo)

Soma os valores de um campo.

```chorty
totalSalarios = ed.somar("utilizadores", "salario")
```

### ed.media(tabela, campo)

Calcula a média dos valores de um campo.

```chorty
mediaIdade = ed.media("utilizadores", "idade")
```

### ed.minimo(tabela, campo) / ed.maximo(tabela, campo)

Retorna o valor mínimo ou máximo de um campo.

```chorty
menor = ed.minimo("utilizadores", "idade")
maior = ed.maximo("utilizadores", "idade")
```

### ed.distintos(tabela, campo)

Retorna os valores únicos de um campo.

```chorty
cidades = ed.distintos("utilizadores", "cidade")
```

---

## Manipulação de dados

### ed.inserir(tabela, dados)

Insere um novo registo na tabela.

- `tabela` — Nome da tabela
- `dados` — Mapa com os valores a inserir

Retorno: identificador do registo inserido.

```chorty
ed.inserir("utilizadores", ed.mapa({
  "nome": "Adilson",
  "idade": 25
}))
```

### ed.inserir_varios(tabela, lista)

Insere vários registos de uma vez.

```chorty
ed.inserir_varios("utilizadores", [
  ed.mapa({"nome": "Ana", "idade": 30}),
  ed.mapa({"nome": "Joao", "idade": 28})
])
```

### ed.actualizar(tabela, dados, opcoes)

Actualiza registos existentes.

- `tabela` — Nome da tabela
- `dados` — Mapa com os novos valores
- `opcoes` — Mapa com a condição onde

Retorno: número de registos actualizados.

```chorty
ed.actualizar("utilizadores",
  ed.mapa({"idade": 26}),
  ed.mapa({"onde": ed.mapa({"nome": "Adilson"})})
)
```

### ed.apagar(tabela, opcoes)

Remove registos da tabela.

- `tabela` — Nome da tabela
- `opcoes` — Mapa com a condição onde (opcional; sem condição apaga tudo)

```chorty
ed.apagar("utilizadores", ed.mapa({"onde": ed.mapa({"id": 5})}))
```

---

## Estrutura de tabelas

### ed.criar_tabela(nome, colunas)

Cria uma nova tabela.

```chorty
ed.criar_tabela("utilizadores", ed.mapa({
  "id": ed.inteiro(ed.mapa({"primario": verdadeiro, "auto_incremento": verdadeiro})),
  "nome": ed.texto(ed.mapa({"obrigatorio": verdadeiro})),
  "email": ed.texto(ed.mapa({"unico": verdadeiro})),
  "idade": ed.inteiro(ed.mapa({}))
}))
```

### ed.apagar_tabela(nome)

```chorty
ed.apagar_tabela("utilizadores")
```

### ed.apagar_tabela_se_existir(nome)

```chorty
ed.apagar_tabela_se_existir("temporaria")
```

### ed.adicionar_coluna(tabela, nome, coluna)

```chorty
ed.adicionar_coluna("utilizadores", "telefone", ed.texto(ed.mapa({})))
```

### ed.remover_coluna(tabela, nome)

```chorty
ed.remover_coluna("utilizadores", "telefone")
```

---

## Índices

### ed.criar_indice(tabela, campo)

```chorty
ed.criar_indice("utilizadores", "nome")
```

### ed.criar_indice_unico(tabela, campo)

```chorty
ed.criar_indice_unico("utilizadores", "email")
```

---

## Junções (JOIN)

### ed.juntar(tabela, origem, destino) — INNER JOIN

```chorty
dados = ed.selecionar("utilizadores", ed.mapa({
  "campos": ["utilizadores.nome", "posts.titulo"],
  "juntar": ed.juntar("posts", "utilizadores.id", "posts.utilizador_id")
}))
```

### ed.juntar_esquerda(tabela, origem, destino) — LEFT JOIN

### ed.juntar_direita(tabela, origem, destino) — RIGHT JOIN

---

## Transacções

### ed.transacao(funcao)

Executa várias operações dentro de uma transacção. Se alguma falhar, tudo é revertido.

```chorty
ed.transacao(funcao()
  ed.inserir("utilizadores", ed.mapa({"nome": "Ana"}))
  ed.inserir("posts", ed.mapa({"titulo": "Ola", "utilizador_id": 1}))
fim)
```

### ed.reverter()

Reverte a transacção actual manualmente.

```chorty
ed.reverter()
```

---

## Operadores

| Operador | Equivalente SQL |
|---|---|
| `ed.igual(v)` | `= v` |
| `ed.diferente(v)` | `!= v` |
| `ed.maior_que(v)` | `> v` |
| `ed.menor_que(v)` | `< v` |
| `ed.maior_ou_igual(v)` | `>= v` |
| `ed.menor_ou_igual(v)` | `<= v` |
| `ed.entre(a, b)` | `BETWEEN a AND b` |
| `ed.em(lista)` | `IN (...)` |
| `ed.contem(v)` | `LIKE '%v%'` |
| `ed.comeca_com(v)` | `LIKE 'v%'` |
| `ed.termina_com(v)` | `LIKE '%v'` |
| `ed.e_nulo()` | `IS NULL` |
| `ed.nao_e_nulo()` | `IS NOT NULL` |
| `ed.e(a, b)` | `AND` |
| `ed.ou(a, b)` | `OR` |
| `ed.nao(c)` | `NOT` |

---

## Tipos de coluna

| Função | SQL equivalente |
|---|---|
| `ed.inteiro(opcoes)` | `INTEGER` |
| `ed.texto(opcoes)` | `TEXT` |
| `ed.decimal_tipo(opcoes)` | `REAL` |
| `ed.logico_tipo(opcoes)` | `BOOLEAN` |
| `ed.data_tipo(opcoes)` | `DATE` |

Opções disponíveis: `primario`, `auto_incremento`, `obrigatorio`, `unico`, `padrao`.

---

## Exemplo completo

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

---

## Resumo

A biblioteca `estrutura.dados` transforma o Chorty numa linguagem capaz de gerir bases de dados relacionais. Todas as operações SQL comuns estão disponíveis com nomes em português, permitindo criar, consultar, actualizar e apagar dados sem nunca escrever SQL directamente.
