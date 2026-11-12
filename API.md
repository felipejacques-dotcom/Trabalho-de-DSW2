# Documentação da API — CineMatch

URL local: `http://localhost:3000`

As respostas JSON usam, em geral, `msg` para a mensagem e `data` para os dados retornados. IDs devem ser inteiros positivos.

## Autenticação

As rotas protegidas recebem o token no cabeçalho:

`Authorization: Bearer SEU_TOKEN_JWT`

O token é obtido em `POST /usuarios/login` e expira após 8 horas.

## Usuários

### `POST /usuarios` — Cadastrar usuário (público)

Body JSON obrigatório:
```json
{
  "nome": "Ana",
  "email": "ana@email.com",
  "senha": "senha123"
}
```
Opcional: `senha_admin`. A conta só será administradora se o valor corresponder a `ADMIN_REGISTER_PASSWORD` configurado no `.env`.

Sucesso `201`:
```json
{
  "msg": "Usuário cadastrado com sucesso",
  "data": {
    "id": 1,
    "nome": "Ana",
    "email": "ana@email.com",
    "is_admin": false
  }
}
```
Erros: `400` campos inválidos; `409` e-mail já cadastrado.

### `POST /usuarios/login` — Login (público)

Body JSON:
```json
{ "email": "ana@email.com", "senha": "senha123" }
```
Sucesso `200`: retorna `data.token` e os dados públicos do usuário. Erro `401`: credenciais incorretas.

### `GET /usuarios/perfil` — Consultar próprio perfil (JWT)

Sucesso `200`: `{ "data": { "id": 1, "nome": "Ana", "email": "ana@email.com", "is_admin": false } }`.

### `GET /usuarios` — Listar usuários (JWT + administrador)

Retorna os usuários sem a senha. Sucesso `200`: `{ "data": [...] }`.

## Filmes

### `GET /filmes` — Listar catálogo (público)

Sem parâmetros. Retorna os filmes e `capa_url` quando houver imagem.

### `GET /filmes/:id` — Detalhar filme (público)

Parâmetro obrigatório: `id` do filme na URL. Retorna dados do filme, média e quantidade de avaliações.

### `POST /filmes` — Cadastrar filme (JWT + administrador)

Content-Type: `multipart/form-data`.

Campos: `titulo` (obrigatório), `sinopse`, `ano`, `genero`, `diretor` e `capa` (arquivo opcional). A capa aceita JPG, PNG ou WEBP, até 5 MB. O conteúdo é armazenado em `filmes.capa` (BYTEA), e o MIME type em `capa_tipo`.

Exemplo de sucesso `201`:
```json
{
  "msg": "Filme cadastrado com sucesso",
  "data": {
    "id": 4,
    "titulo": "Interestelar",
    "sinopse": "Uma equipe viaja pelo espaço.",
    "ano": 2014,
    "genero": "Ficção científica",
    "diretor": "Christopher Nolan",
    "possui_capa": true,
    "capa_url": "/filmes/4/capa"
  }
}
```

### `PUT /filmes/:id` — Atualizar filme (JWT + administrador)

Parâmetro obrigatório: `id`. Content-Type: `multipart/form-data`. Campos opcionais: `titulo`, `sinopse`, `ano`, `genero`, `diretor` e `capa`. Campos não enviados mantêm o valor atual. Enviar uma nova capa substitui o arquivo anterior.

### `DELETE /filmes/:id` — Excluir filme (JWT + administrador)

Parâmetro obrigatório: `id`. Remove o filme; favoritos e avaliações relacionados são removidos pelas chaves estrangeiras com `ON DELETE CASCADE`.

### Arquivos de capa

As imagens são armazenadas diretamente no PostgreSQL: `filmes.capa` (`BYTEA`) guarda os bytes e `filmes.capa_tipo` guarda o MIME type. Para enviar, use `multipart/form-data` com o campo `capa`. Para visualizar a imagem: `GET /filmes/:id/capa` (retorna o arquivo com o Content-Type correto). As respostas de listagem/detalhe incluem `capa_url` e não retornam o conteúdo binário.

## Favoritos

Todas as rotas exigem JWT. O usuário é identificado pelo token, portanto não se informa `usuario_id`.

### `GET /favoritos` — Listar favoritos do usuário autenticado

Sucesso `200`: `{ "msg": "Favoritos encontrados", "data": [...] }`.

### `POST /favoritos/:filme_id` — Adicionar favorito

Parâmetro obrigatório: `filme_id`. Sucesso `201`; `404` se o filme não existir; `409` se já estiver favoritado.

### `DELETE /favoritos/:filme_id` — Remover favorito

Parâmetro obrigatório: `filme_id`. Sucesso `200`; `404` se não estiver na lista do usuário.

## Avaliações

### `GET /avaliacoes/filme/:filme_id` — Listar avaliações (público)

Parâmetro obrigatório: `filme_id`. Retorna nota, comentário, data e nome do autor.

### `POST /avaliacoes/:filme_id` — Criar avaliação (JWT)

Parâmetro obrigatório: `filme_id`. Body JSON:
```json
{ "nota": 9.5, "comentario": "Excelente filme!" }
```
`nota` é obrigatória e deve estar entre 0 e 10. `comentario` é opcional. Cada usuário pode avaliar um filme uma vez. Sucesso `201`; `409` se já avaliou.

### `PUT /avaliacoes/:id` — Editar avaliação própria (JWT)

Parâmetro obrigatório: `id` da avaliação. Body JSON com `nota` e/ou `comentario`. O usuário só altera a própria avaliação. Sucesso `200`.

### `DELETE /avaliacoes/:id` — Excluir avaliação própria (JWT)

Parâmetro obrigatório: `id` da avaliação. O usuário só exclui a própria avaliação. Sucesso `200`.

## Códigos HTTP utilizados

- `200`: operação realizada.
- `201`: registro criado.
- `400`: dados ou parâmetros inválidos.
- `401`: token ausente/inválido ou credenciais incorretas.
- `403`: usuário sem permissão administrativa.
- `404`: registro não encontrado.
- `409`: conflito, como e-mail duplicado ou favorito/avaliação existente.
- `500`: erro interno do servidor.
