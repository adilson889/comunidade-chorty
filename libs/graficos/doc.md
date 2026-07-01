# Gráficos (barras, linhas, pizza, área, radar)

## Conceito

As bibliotecas de gráficos renderizam SVG nativo — sem dependências externas. Cada tipo de gráfico é uma biblioteca separada, mas todas partilham a mesma filosofia: **os dados vêm directamente de um bloco TOON**, sem JSON manual, sem `rotulos`/`series` escritos à mão.

```
Regra de ouro:
utilizadores[]{id, nome, pontos}:  ← declaras os dados uma vez em TOON
gb:grafico itens=utilizadores ...   ← qualquer lib de gráfico lê o mesmo array
```

## Bibliotecas disponíveis

| Biblioteca | Alias | Componente | Uso ideal |
|---|---|---|---|
| `graficos.barras` | `gb` | `gb:grafico` | Comparar valores entre categorias |
| `graficos.linhas` | `gl` | `gl:grafico` | Tendências ao longo do tempo |
| `graficos.pizza` | `gp` | `gp:grafico` | Proporções de um total |
| `graficos.area` | `ga` | `ga:grafico` | Tendências com volume acumulado |
| `graficos.radar` | `gr` | `gr:grafico` | Comparar múltiplas métricas de um item |

## Instalação

Instala apenas as que precisares:

```chorty
config
  usar biblioteca graficos.barras gb
  usar biblioteca graficos.linhas gl
  usar biblioteca graficos.pizza gp
  usar biblioteca graficos.area ga
  usar biblioteca graficos.radar gr
fim
```

## Passo 1 — declarar os dados em TOON

Todas as libs de gráfico partilham a mesma fonte de dados: um bloco TOON.

```chorty
utilizadores[]{id, nome, pontos}:
  1, "Alice", 30
  2, "Bob", 28
  3, "Carlos", 45
```

- `utilizadores[]{...}:` declara o array e os seus campos
- cada linha seguinte, indentada, é um registo (separado por vírgulas, na mesma ordem dos campos)

## Passo 2 — usar o gráfico

Todos os componentes `grafico` das 5 bibliotecas usam os **mesmos nomes de atributo**:

| Atributo | Obrigatório | Descrição |
|---|---|---|
| `itens` | sim | nome do array TOON a usar |
| `rotulo` | sim* | nome do campo a usar como rótulo (eixo X / legenda) |
| `valor` | sim | nome do campo numérico a usar. Aceita vários separados por vírgula: `valor="vendas,despesas"` |
| `conteudo` | não | título mostrado acima do gráfico |
| `altura` | não | altura em pixels (padrão `300`, radar `360`) |
| `cor` | não | cor principal — só usada quando há uma única série |

> \* No `graficos.radar`, `rotulo` não é usado; os "eixos" do radar vêm de `valor` (os nomes dos campos, um por eixo).

### Sintaxe comum

```chorty
alias:grafico
  itens=nomeDoArrayToon
  rotulo="campo"
  valor="campo"
  conteudo="Título opcional"
  altura=300
  cor="azul"
fim
```

## Exemplos por tipo

### gb:grafico (barras)

```chorty
gb:grafico
  itens=utilizadores
  rotulo="nome"
  valor="pontos"
  conteudo="Pontos por Utilizador"
fim
```

Múltiplas séries (barras agrupadas):

```chorty
gb:grafico
  itens=utilizadores
  rotulo="nome"
  valor="pontos,bonus"
  conteudo="Pontos e Bónus"
fim
```

### gl:grafico (linhas)

```chorty
gl:grafico
  itens=vendas
  rotulo="mes"
  valor="total"
  conteudo="Crescimento Mensal"
  cor="verde"
fim
```

### gp:grafico (pizza)

Usa sempre um único campo de valor — não suporta múltiplas séries.

```chorty
gp:grafico
  itens=regioes
  rotulo="nome"
  valor="percentagem"
  conteudo="Distribuição Regional"
fim
```

### ga:grafico (área)

```chorty
ga:grafico
  itens=sessoes
  rotulo="mes"
  valor="total"
  conteudo="Sessões Mensais"
  cor="roxo"
fim
```

### gr:grafico (radar)

No radar, `valor` define os **eixos** do gráfico (uma métrica por eixo). Cada linha do array TOON vira um polígono sobreposto — útil para comparar vários itens no mesmo gráfico.

```chorty
jogadores[]{nome, ataque, defesa, velocidade, resistencia}:
  1, "Jogador A", 80, 60, 90, 70

gr:grafico
  itens=jogadores
  valor="ataque,defesa,velocidade,resistencia"
  conteudo="Perfil do Jogador"
fim
```

## Cores disponíveis

| Nome | Nome | Nome |
|---|---|---|
| `azul` | `verde` | `vermelho` |
| `amarelo` | `laranja` | `roxo` |
| `rosa` | `ciano` | `turquesa` |
| `indigo` | `cinza` | `preto` |
| `branco` | | |

Quando há mais do que uma série (`valor="a,b,c"`), a cor é atribuída automaticamente a partir de uma paleta — o atributo `cor` só se aplica a gráficos de série única.

## Exemplo completo (dashboard)

```chorty
app "Dashboard Vendas"

config
  saida = "app"
  importar elementosUI
  importar reatividade
  usar biblioteca graficos.barras gb
  usar biblioteca graficos.pizza gp
fim

tela "Dashboard"

  cabecalho
    titulo "Painel de Vendas"
  fim

  vendas[]{mes, total, despesas}:
    1, "Jan", 120, 80
    2, "Fev", 200, 95
    3, "Mar", 150, 110

  regioes[]{nome, percentagem}:
    1, "Luanda", 35
    2, "Benguela", 25
    3, "Huíla", 20
    4, "Huambo", 15
    5, "Outros", 5

  secao espaco=24
    titulo "Resumo Mensal"
    gb:grafico
      itens=vendas
      rotulo="mes"
      valor="total,despesas"
      conteudo="Vendas Mensais"
    fim
  fim

  secao espaco=24
    titulo "Distribuição"
    gp:grafico
      itens=regioes
      rotulo="nome"
      valor="percentagem"
      conteudo="Por Região"
    fim
  fim

fim
```

## Notas técnicas

- Os componentes `grafico` só resolvem `itens` correctamente se este for uma variável declarada com TOON (`nome[]{...}:`) — não usar strings JSON manuais.
- `rotulo` e `valor` são **nomes de campo** (texto), sempre entre aspas.
- Não uses `dados`, `titulo` ou `id` como nome de atributo em qualquer biblioteca — são palavras reservadas do Chorty e ficam sempre vazias. Por isso estas bibliotecas usam `itens`, `conteudo` e `ref`.

## Resumo

As 5 bibliotecas de gráficos (`barras`, `linhas`, `pizza`, `area`, `radar`) partilham uma API idêntica: declara os dados uma vez com TOON, depois usa `itens=`, `rotulo=`, `valor=` e `conteudo=` em qualquer uma delas. Trocar de tipo de gráfico é só trocar o alias — a estrutura do bloco mantém-se igual.
