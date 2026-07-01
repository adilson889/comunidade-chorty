
# Estrutura Motor (em)

## Conceito

Motor de base de dados real via SQLite (SQL.js/WASM), com persistência automática em IndexedDB. Liga-se automaticamente à biblioteca `estrutura.dados` — depois de instalada, todas as chamadas `ed.` passam a executar de verdade em vez de só gerar SQL.

## Instalação

```chorty
config
  usar biblioteca estrutura.motor em
  usar biblioteca estrutura.dados ed
fim
```

> A ordem importa: `estrutura.motor` primeiro, `estrutura.dados` depois.

## Uso

O motor carrega de forma **assíncrona** (baixa WASM, abre IndexedDB). Nunca chames `ed.` antes de estar pronto — usa sempre `em.aoPronto(...)`.

```chorty
funcao iniciar()
  em.aoPronto(carregarDados)
fim

funcao carregarDados()
  ed.criar_tabela("utilizadores", ed.mapa({
    "id": ed.inteiro(ed.mapa({"primario": verdadeiro, "auto_incremento": verdadeiro})),
    "nome": ed.texto(ed.mapa({}))
  }))
  utilizadores = ed.selecionar("utilizadores")
fim
```

## Função

### em.aoPronto(funcao)

Executa `funcao` assim que a base de dados estiver pronta. Se já estiver pronta, executa imediatamente.

## Persistência

Os dados ficam gravados em IndexedDB (`chorty_db`), sobrevivendo a recarregar a página. A gravação é automática após cada `INSERT`, `UPDATE`, `DELETE` ou `CREATE TABLE`, com pequeno atraso (400ms) para agrupar escritas seguidas.

## Notas técnicas

- Sem `estrutura.motor` instalada, `estrutura.dados` continua a funcionar em modo "só gera SQL" (mostra no console, não executa).
- `SELECT` devolve uma lista de objetos (um por linha). `INSERT`/`UPDATE`/`DELETE` devolvem o número de linhas afetadas.
- Erros de SQL aparecem no console do navegador, não interrompem a aplicação.