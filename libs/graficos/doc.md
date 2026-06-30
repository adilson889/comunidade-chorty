
## Graficos (gf)

## Conceito

A biblioteca `graficos` renderiza graficos SVG nativos — barras, linhas, pizza, area e horizontais. Sem dependencias externas. Os dados sao passados como `rotulos` e `series` em formato JSON.

## Instalacao

```chorty
usar biblioteca graficos gf
```

Componente

gf:grafico

Componente unico que renderiza o tipo de grafico especificado.

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

Atributos

Atributo Tipo Valores Padrao Descricao
tipo texto "barras", "linhas", "pizza", "area", "horizontal" "barras" Tipo de grafico
titulo texto — vazio Titulo exibido acima do grafico
altura numero — 300 Altura em pixels
cor texto nomes semanticos ou hex "azul" Cor principal (graficos de 1 serie)
rotulos texto JSON array [] Rotulos do eixo X
series texto JSON array [] Series de dados com nome e valores
espaco numero — — Padding interno
margem numero — — Margem externa
sombra texto "leve", "media", "forte" — Sombra do grafico

Tipos de grafico

gf:grafico tipo="barras"

Barras verticais agrupadas. Suporta multiplas series.

```chorty
gf:grafico
  tipo="barras"
  titulo="Vendas por Mes"
  altura=300
  rotulos="['Jan','Fev','Mar','Abr','Mai','Jun']"
  series="[{nome:'Produto A',valores:[120,200,150,80,180,220]},{nome:'Produto B',valores:[80,95,110,70,100,130]}]"
```

gf:grafico tipo="linhas"

Linhas conectadas com pontos. Ideal para tendencias.

```chorty
gf:grafico
  tipo="linhas"
  titulo="Crescimento Anual"
  altura=300
  rotulos="['2020','2021','2022','2023','2024']"
  series="[{nome:'Clientes',valores:[150,280,450,620,890]}]"
```

gf:grafico tipo="pizza"

Grafico circular. Usa apenas a primeira serie.

```chorty
gf:grafico
  tipo="pizza"
  titulo="Distribuicao Regional"
  altura=300
  rotulos="['Luanda','Benguela','Huila','Huambo','Outros']"
  series="[{nome:'Regioes',valores:[35,25,20,15,5]}]"
```

gf:grafico tipo="area"

Area preenchida. Ideal para volumes.

```chorty
gf:grafico
  tipo="area"
  titulo="Sessoes Mensais"
  altura=300
  rotulos="['Jan','Fev','Mar','Abr','Mai']"
  series="[{nome:'Sessoes',valores:[1200,2000,1500,1800,2200]}]"
```

gf:grafico tipo="horizontal"

Barras horizontais com valores.

```chorty
gf:grafico
  tipo="horizontal"
  titulo="Top Categorias"
  altura=300
  rotulos="['Tecnologia','Saude','Educacao','Financas','Energia']"
  series="[{nome:'Investimento',valores:[850,620,480,350,290]}]"
```

Cores disponiveis

azul, verde, vermelho, amarelo, laranja, roxo, rosa, ciano, turquesa, indigo, cinza, preto, branco

Para multiplas series, as cores sao atribuidas automaticamente a partir da paleta.

Estilo visual

O grafico aceita atributos de estilo do ResolvedorEstilo nativo:

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

Exemplo completo

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

    titulo "Distribuicao"

    gf:grafico
      tipo="pizza"
      titulo="Por Regiao"
      altura=300
      rotulos="['Luanda','Benguela','Huila','Huambo','Outros']"
      series="[{nome:'Regioes',valores:[35,25,20,15,5]}]"

  fim

fim
```

Resumo

A biblioteca graficos oferece 5 tipos de graficos SVG nativos. Os dados sao passados como rotulos e series em formato JSON. Suporta atributos de estilo do ResolvedorEstilo nativo. Sem dependencias externas.