
# Gráficos (gf)

## Conceito

A biblioteca `graficos` renderiza gráficos SVG nativos — barras, linhas, pizza, área e horizontais. Sem dependências externas. Os dados são passados como `rótulos` e `séries` em formato JSON.

## Instalação

```chorty
usar biblioteca graficos gf
```

## Componente

### gf:grafico

Componente único que renderiza o tipo de gráfico especificado.

```chorty
gf:grafico
  tipo="barras"
  titulo="Vendas Mensais"
  altura=300
  cor="azul"
  rotulos="['Jan','Fev','Mar','Abr','Mai']"
  series="[{nome:'Vendas',valores:[120,200,150,80,180]},{nome:'Despesas',valores:[80,95,110,70,100]}]"
  espaco=16
  sombra="media"
```

## Atributos

| Atributo | Tipo | Valores | Padrão | Descrição |
|----------|------|---------|--------|-----------|
| `tipo` | texto | `"barras"`, `"linhas"`, `"pizza"`, `"area"`, `"horizontal"` | `"barras"` | Tipo de gráfico |
| `titulo` | texto | — | vazio | Título exibido acima do gráfico |
| `altura` | número | — | `300` | Altura em pixels |
| `cor` | texto | nomes semânticos ou hex | `"azul"` | Cor principal (gráficos de 1 série) |
| `rotulos` | texto | JSON array | `[]` | Rótulos do eixo X |
| `series` | texto | JSON array | `[]` | Séries de dados com nome e valores |
| `espaco` | número | — | — | Padding interno |
| `margem` | número | — | — | Margem externa |
| `sombra` | texto | `"leve"`, `"media"`, `"forte"` | — | Sombra do gráfico |

## Tipos de Gráfico

### gf:grafico tipo="barras"

Barras verticais agrupadas. Suporta múltiplas séries.

```chorty
gf:grafico
  tipo="barras"
  titulo="Vendas por Mês"
  altura=300
  rotulos="['Jan','Fev','Mar','Abr','Mai','Jun']"
  series="[{nome:'Produto A',valores:[120,200,150,80,180,220]},{nome:'Produto B',valores:[80,95,110,70,100,130]}]"
```

### gf:grafico tipo="linhas"

Linhas conectadas com pontos. Ideal para tendências.

```chorty
gf:grafico
  tipo="linhas"
  titulo="Crescimento Anual"
  altura=300
  rotulos="['2020','2021','2022','2023','2024']"
  series="[{nome:'Clientes',valores:[150,280,450,620,890]}]"
```

### gf:grafico tipo="pizza"

Gráfico circular. Usa apenas a primeira série.

```chorty
gf:grafico
  tipo="pizza"
  titulo="Distribuição Regional"
  altura=300
  rotulos="['Luanda','Benguela','Huila','Huambo','Outros']"
  series="[{nome:'Regiões',valores:[35,25,20,15,5]}]"
```

### gf:grafico tipo="area"

Área preenchida. Ideal para volumes.

```chorty
gf:grafico
  tipo="area"
  titulo="Sessões Mensais"
  altura=300
  rotulos="['Jan','Fev','Mar','Abr','Mai']"
  series="[{nome:'Sessões',valores:[1200,2000,1500,1800,2200]}]"
```

### gf:grafico tipo="horizontal"

Barras horizontais com valores.

```chorty
gf:grafico
  tipo="horizontal"
  titulo="Top Categorias"
  altura=300
  rotulos="['Tecnologia','Saúde','Educação','Finanças','Energia']"
  series="[{nome:'Investimento',valores:[850,620,480,350,290]}]"
```

## Cores Disponíveis

| Cor | Valor |
|-----|-------|
| Azul | `"azul"` |
| Verde | `"verde"` |
| Vermelho | `"vermelho"` |
| Amarelo | `"amarelo"` |
| Laranja | `"laranja"` |
| Roxo | `"roxo"` |
| Rosa | `"rosa"` |
| Ciano | `"ciano"` |
| Turquesa | `"turquesa"` |
| Índigo | `"indigo"` |
| Cinza | `"cinza"` |
| Preto | `"preto"` |
| Branco | `"branco"` |

Para múltiplas séries, as cores são atribuídas automaticamente a partir da paleta.

## Estilo Visual

O gráfico aceita atributos de estilo do ResolvedorEstilo nativo:

```chorty
gf:grafico
  tipo="barras"
  titulo="Vendas"
  altura=350
  espaco=20
  margem=16
  sombra="media"
  rotulos="['A','B','C']"
  series="[{nome:'X',valores:[10,20,30]}]"
```

## Exemplo Completo

```chorty
app "Dashboard Vendas"

config
  saida = "app"
  importar elementosUI
  importar reatividade
  usar biblioteca graficos gf
fim

tela "Dashboard"

  cabecalho
    titulo "Painel de Vendas"
  fim

  secao espaco=24

    titulo "Resumo Mensal"

    gf:grafico
      tipo="barras"
      titulo="Vendas Mensais"
      altura=300
      rotulos="['Jan','Fev','Mar','Abr','Mai','Jun']"
      series="[{nome:'Vendas',valores:[120,200,150,180,220,250]},{nome:'Despesas',valores:[80,95,110,70,100,130]}]"
      sombra="media"
      espaco=16

  fim

  secao espaco=24

    titulo "Distribuição"

    gf:grafico
      tipo="pizza"
      titulo="Por Região"
      altura=300
      rotulos="['Luanda','Benguela','Huila','Huambo','Outros']"
      series="[{nome:'Regiões',valores:[35,25,20,15,5]}]"

  fim

fim
```

## Resumo

A biblioteca `graficos` oferece 5 tipos de gráficos SVG nativos. Os dados são passados como rótulos e séries em formato JSON. Suporta atributos de estilo do ResolvedorEstilo nativo. Sem dependências externas.