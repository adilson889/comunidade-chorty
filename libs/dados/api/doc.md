# dados.api (da)

## Conceito

Ponte completa para APIs REST. Busca, cria, atualiza, edita e apaga recursos diretamente de qualquer API HTTP. Funciona em qualquer contexto — script puro, app ou console.

## Instalação

```chorty
usar biblioteca dados.api da
```

## Funções

### da.buscar(url)

Faz um pedido GET e retorna os dados.

```chorty
tarefas = da.buscar("https://api.exemplo.com/tarefas")
imprimir(tarefas[0].titulo)
```

### da.enviar(url, corpo)

Faz um pedido POST com corpo JSON.

```chorty
nova = da.enviar("https://api.exemplo.com/tarefas", {"titulo": "Estudar Chorty", "completa": falso})
imprimir(nova.id)
```

### da.atualizar(url, corpo)

Faz um pedido PUT para substituir um recurso.

```chorty
atualizada = da.atualizar("https://api.exemplo.com/tarefas/1", {"titulo": "Estudar mais Chorty", "completa": verdadeiro})
imprimir(atualizada.titulo)
```

### da.editar(url, corpo)

Faz um pedido PATCH para modificar parcialmente um recurso.

```chorty
resultado = da.editar("https://api.exemplo.com/tarefas/1", {"completa": verdadeiro})
imprimir(resultado.completa)
```

### da.apagar(url)

Faz um pedido DELETE para remover um recurso.

```chorty
resultado = da.apagar("https://api.exemplo.com/tarefas/1")
imprimir("Apagado com sucesso")
```

### da.cabecalho(chave, valor)

Define um cabeçalho HTTP para os próximos pedidos.

```chorty
da.cabecalho("Authorization", "Bearer token123")
da.cabecalho("X-API-Key", "chave-secreta")
dados = da.buscar("https://api.exemplo.com/protegido")
```

### da.limparCabecalhos()

Remove todos os cabeçalhos definidos.

```chorty
da.limparCabecalhos()
```

## Resumo dos métodos

| Método | HTTP | Descrição |
| --- | --- | --- |
| `da.buscar(url)` | GET | Busca dados |
| `da.enviar(url, corpo)` | POST | Cria recurso |
| `da.atualizar(url, corpo)` | PUT | Substitui recurso |
| `da.editar(url, corpo)` | PATCH | Modifica parcialmente |
| `da.apagar(url)` | DELETE | Remove recurso |
| `da.cabecalho(chave, valor)` | — | Define cabeçalho |
| `da.limparCabecalhos()` | — | Limpa cabeçalhos |

## Exemplos completos

### Buscar e mostrar dados

```chorty
usar biblioteca dados.api da

resultado = da.buscar("https://jsonplaceholder.typicode.com/todos/1")
imprimir("ID: " & texto(resultado.id))
imprimir("Titulo: " & resultado.title)
imprimir("Completo: " & texto(resultado.completed))

todos = da.buscar("https://jsonplaceholder.typicode.com/todos")
imprimir("Total: " & texto(comprimento(todos)))
imprimir("Primeiro: " & todos[0].title)
```

### Criar e atualizar recurso

```chorty
usar biblioteca dados.api da

novo = da.enviar("https://jsonplaceholder.typicode.com/posts", {
  "title": "Aprendendo Chorty",
  "body": "Chorty e incrivel!",
  "userId": 1
})
imprimir("Criado ID: " & texto(novo.id))

atualizado = da.atualizar("https://jsonplaceholder.typicode.com/posts/1", {
  "title": "Chorty Master",
  "body": "Dominando APIs com Chorty.",
  "userId": 1
})
imprimir("Atualizado: " & atualizado.title)
```

### API com autenticacao

```chorty
usar biblioteca dados.api da

da.cabecalho("Authorization", "Bearer meu-token-secreto")

perfil = da.buscar("https://api.exemplo.com/perfil")
imprimir("Nome: " & perfil.nome)
imprimir("Email: " & perfil.email)

da.limparCabecalhos()
```

### Funcao reutilizavel para buscar

```chorty
usar biblioteca dados.api da

funcao buscarTarefas()
  tarefas = da.buscar("https://jsonplaceholder.typicode.com/todos")
  imprimir("Encontradas: " & texto(comprimento(tarefas)))
  para cada t in tarefas
    se t.completed
      imprimir("[X] " & t.title)
    fim
  fim
fim

buscarTarefas()
```

## Notas tecnicas

- Os pedidos usam `fetch` com espera sincronizada quando disponivel no ambiente (requer `Atomics` e `SharedArrayBuffer`).
- Em ambientes sem suporte a `fetch` ou `Atomics`, o shim cai automaticamente para `XMLHttpRequest` sincrono como fallback.
- O corpo dos pedidos (`enviar`, `atualizar`, `editar`) e enviado como JSON.
- Cabecalhos definidos com `da.cabecalho` aplicam-se a todos os pedidos seguintes ate `da.limparCabecalhos()` ser chamado.
- Em caso de erro HTTP (status >= 300), e lancada uma excecao com o codigo do erro — usa `tentar/pegar` para tratar.
- Funciona em qualquer contexto: script puro, console, app.
