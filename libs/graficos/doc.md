
# Gráficos (gt)

## Conceito

Pacote unificado de gráficos SVG nativos — sem dependências externas. Um único componente `gt:grafico` renderiza 5 tipos diferentes, escolhidos pelo atributo `tipo`. Os dados vêm directamente de um bloco TOON, sem JSON manual.

```
Regra de ouro:
utilizadores[]{id, nome, pontos}:   ← declaras os dados uma vez em TOON
gt:grafico itens=utilizadores tipo="barras" ...
```

## Instalação

```chorty
config
  usar biblioteca graficos gt
fim
```

## Passo 1 — declarar os dados em TOON

```chorty
utilizadores[]{id, nome, pontos}:
  1, "Alice", 30
  2, "Bob", 28
  3, "Carlos", 45
```

## Passo 2 — usar o gráfico

```chorty
gt:grafico
  itens=nomeDoArrayToon
  tipo="barras"
  rotulo="campo"
  valor="campo"
  conteudo="Título opcional"
  altura=300
  cor="azul"
fim
```

## Atributos

| Atributo | Obrigatório | Descrição |
|---|---|---|
| `itens` | sim | nome do array TOON a usar |
| `tipo` | sim | `"barras"`, `"linhas"`, `"pizza"`, `"area"` ou `"radar"` (padrão: `"barras"`) |
| `rotulo` | sim* | campo a usar como rótulo (eixo X / legenda) |
| `valor` | sim | campo numérico. Aceita vários separados por vírgula: `valor="vendas,despesas"` |
| `conteudo` | não | título acima do gráfico |
| `altura` | não | pixels (padrão `300`, radar `360`) |
| `cor` | não | só usada com série única |

> \* No `tipo="radar"`, `rotulo` não é usado — os eixos vêm de `valor` (um campo por eixo).

## Exemplos por tipo

### Barras

```chorty
gt:grafico
  itens=utilizadores
  tipo="barras"
  rotulo="nome"
  valor="pontos"
  conteudo="Pontos por Utilizador"
fim
```

Múltiplas séries:

```chorty
gt:grafico
  itens=utilizadores
  tipo="barras"
  rotulo="nome"
  valor="pontos,bonus"
  conteudo="Pontos e Bónus"
fim
```

### Linhas

```chorty
gt:grafico
  itens=vendas
  tipo="linhas"
  rotulo="mes"
  valor="total"
  conteudo="Crescimento Mensal"
  cor="verde"
fim
```

### Pizza

```chorty
gt:grafico
  itens=regioes
  tipo="pizza"
  rotulo="nome"
  valor="percentagem"
  conteudo="Distribuição Regional"
fim
```

### Área

```chorty
gt:grafico
  itens=sessoes
  tipo="area"
  rotulo="mes"
  valor="total"
  conteudo="Sessões Mensais"
  cor="roxo"
fim
```

### Radar

```chorty
jogadores[]{nome, ataque, defesa, velocidade, resistencia}:
  1, "Jogador A", 80, 60, 90, 70

gt:grafico
  itens=jogadores
  tipo="radar"
  valor="ataque,defesa,velocidade,resistencia"
  conteudo="Perfil do Jogador"
fim
```

## Cores disponíveis

`azul`, `verde`, `vermelho`, `amarelo`, `laranja`, `roxo`, `rosa`, `ciano`, `turquesa`, `indigo`, `cinza`, `preto`, `branco`

## Exemplo completo (dashboard)

```chorty
app "Dashboard Vendas"

config
  saida = "app"
  importar elementosUI
  importar reatividade
  usar biblioteca graficos gt
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

  secao espaco=24
    titulo "Resumo Mensal"
    gt:grafico
      itens=vendas
      tipo="barras"
      rotulo="mes"
      valor="total,despesas"
      conteudo="Vendas Mensais"
    fim
  fim

  secao espaco=24
    titulo "Distribuição"
    gt:grafico
      itens=regioes
      tipo="pizza"
      rotulo="nome"
      valor="percentagem"
      conteudo="Por Região"
    fim
  fim

fim
```

## Notas técnicas

- `itens` só resolve correctamente com uma variável TOON (`nome[]{...}:`), não JSON manual.
- `rotulo`, `valor` e `tipo` são texto — sempre entre aspas.
- `ref` é gerado automaticamente pelo Parser; nunca precisas de o definir.
- Não uses `dados`, `titulo` ou `id` como nome de atributo — são palavras reservadas do Chorty.

## Resumo

Um único alias `gt`, um único componente `gt:grafico`, cinco tipos disponíveis via `tipo=`. Trocar de gráfico é só trocar o valor de `tipo` — o resto da estrutura mantém-se igual.