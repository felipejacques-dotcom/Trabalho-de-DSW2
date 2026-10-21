# Trabalho-de-DSW2
Site de Avaliação de Filmes
# CineMatch

## Sobre o Projeto

O CineMatch é uma aplicação web voltada para a descoberta e organização de filmes.

A plataforma permitirá que os usuários criem uma conta, façam login, visualizem um catálogo de filmes e adicionem seus filmes favoritos a uma lista pessoal.

O sistema terá dois tipos de acesso: usuário comum e administrador. O usuário comum poderá utilizar as funcionalidades relacionadas à consulta e organização dos filmes, enquanto o administrador terá acesso às funções de gerenciamento do catálogo.

O projeto será composto por um backend desenvolvido em JavaScript com Node.js e Express, responsável pela API REST e pela comunicação com o banco de dados PostgreSQL, e por um frontend desenvolvido em React, responsável pela interface utilizada pelos usuários.

## Objetivo

O objetivo do CineMatch é oferecer uma plataforma simples para que usuários possam consultar filmes, visualizar suas informações e organizar seus filmes favoritos, enquanto o administrador poderá manter o catálogo atualizado.

## Tipos de Usuário

O sistema contará com dois tipos de usuários: usuário comum e administrador.

### Usuário Comum

O usuário comum poderá:

- Criar uma conta;
- Fazer login;
- Visualizar o catálogo de filmes;
- Visualizar os detalhes de um filme;
- Adicionar filmes aos favoritos;
- Remover filmes dos favoritos;
- Visualizar sua lista de filmes favoritos.

### Administrador

O administrador terá acesso às mesmas funcionalidades do usuário comum, além das funções de gerenciamento do catálogo.

Para que uma conta tenha acesso de administrador, será necessário informar uma senha de administrador durante o cadastro.

O sistema verificará essa senha e, caso esteja correta, a conta será cadastrada como administrador. Caso a senha não seja informada ou esteja incorreta, a conta será cadastrada como usuário comum.

O administrador poderá:

- Cadastrar filmes;
- Editar filmes;
- Excluir filmes;
- Visualizar todos os filmes cadastrados.

## Catálogo de Filmes

O CineMatch possuirá um catálogo contendo os filmes cadastrados pelos administradores.

Cada filme terá informações como:

- Título;
- Sinopse;
- Ano de lançamento;
- Gênero;
- Diretor;
- Capa.

Os filmes serão apresentados no catálogo de forma organizada. Ao selecionar um filme, o usuário poderá visualizar suas informações completas.

## Filmes Favoritos

Os usuários poderão adicionar filmes à sua lista de favoritos e removê-los quando desejarem.

Cada usuário terá sua própria lista de favoritos, que poderá ser acessada pela página "Meus Favoritos".

### Relacionamento N:N

A funcionalidade de favoritos representará um relacionamento muitos-para-muitos (N:N) entre usuários e filmes.

Um usuário poderá favoritar vários filmes e um filme poderá ser favoritado por vários usuários.

Esse relacionamento será representado pela tabela `favoritos`.

```text
USUÁRIO N -------- N FILME
           |
       FAVORITOS
```

## Sistema de Login e Autenticação

O sistema possuirá cadastro e login de usuários.

Durante o cadastro serão informados:

- Nome;
- E-mail;
- Senha;
- Senha de administrador, caso o usuário queira criar uma conta administrativa.

Após realizar o login, o backend gerará um JWT (JSON Web Token) para identificar o usuário autenticado.

O token será utilizado para acessar funcionalidades que exigem autenticação.

O sistema também verificará o tipo de usuário para determinar quais funcionalidades poderão ser acessadas.

### Fluxo de acesso

```text
CADASTRO
   |
   v
Nome + E-mail + Senha
   |
   v
Senha de administrador foi informada?
   |
   +-------------------+
   |                   |
  SIM                 NÃO
   |                   |
   v                   v
ADMIN              USUÁRIO
   |                   |
   +---------+---------+
             |
             v
           LOGIN
             |
             v
            JWT
             |
             v
    Sistema identifica
     o tipo de usuário
```

## Upload de Arquivos

O sistema terá uma funcionalidade de upload de arquivos para as capas dos filmes.

Ao cadastrar ou editar um filme, o administrador poderá enviar uma imagem que será utilizada como capa no catálogo.

O arquivo será enviado pelo frontend para o backend e armazenado pelo sistema.

## Gerenciamento de Filmes

Somente administradores poderão modificar o catálogo.

O administrador poderá realizar as seguintes operações:

### Cadastrar

Adicionar um novo filme ao catálogo.

### Visualizar

Visualizar os filmes cadastrados.

### Editar

Alterar as informações de um filme.

### Excluir

Remover um filme do catálogo.

Essas operações formarão o CRUD de filmes.

## Banco de Dados

O banco de dados será desenvolvido utilizando PostgreSQL.

O sistema contará inicialmente com três tabelas principais.

### usuarios

Armazena as informações das contas cadastradas.

| Campo | Descrição |
|---|---|
| `id` | Identificador do usuário |
| `nome` | Nome do usuário |
| `email` | E-mail |
| `senha` | Senha do usuário |
| `tipo` | Tipo de usuário |

### filmes

Armazena as informações dos filmes disponíveis no catálogo.

| Campo | Descrição |
|---|---|
| `id` | Identificador do filme |
| `titulo` | Título |
| `sinopse` | Sinopse |
| `ano` | Ano de lançamento |
| `genero` | Gênero |
| `diretor` | Diretor |
| `capa` | Imagem da capa |

### favoritos

Relaciona os usuários aos filmes adicionados aos favoritos.

| Campo | Descrição |
|---|---|
| `id` | Identificador |
| `usuario_id` | Usuário |
| `filme_id` | Filme |

## Relacionamentos do Banco

O banco de dados possuirá os relacionamentos necessários para o projeto.

### Relacionamento 1:N

Um usuário poderá possuir vários registros na tabela de favoritos.

```text
USUÁRIO 1 -------- N FAVORITOS
```

### Relacionamento N:N

Um usuário poderá favoritar vários filmes e um filme poderá ser favoritado por vários usuários.

```text
USUÁRIO N -------- N FILME
           |
       FAVORITOS
```

A tabela `favoritos` será responsável por representar o relacionamento N:N entre `usuarios` e `filmes`.

## API REST

O backend disponibilizará uma API REST para permitir a comunicação entre o frontend React e o banco de dados.

### Usuários

```text
POST   /usuarios
POST   /usuarios/login
```

### Filmes

```text
GET    /filmes
GET    /filmes/:id
POST   /filmes
PUT    /filmes/:id
DELETE /filmes/:id
```

### Favoritos

```text
GET    /favoritos
POST   /favoritos/:filme_id
DELETE /favoritos/:filme_id
```

## Frontend

O frontend será desenvolvido utilizando React e será responsável pela interface do CineMatch.

As principais páginas serão:

```text
/login
/cadastro
/filmes
/filmes/:id
/favoritos
/admin
```

### Página Inicial

Apresentará o catálogo de filmes disponíveis.

### Página de Login

Permite que usuários cadastrados entrem no sistema.

### Página de Cadastro

Permite criar uma nova conta e definir se ela será de usuário comum ou administrador por meio da senha de administrador.

### Página de Filmes

Apresentará os filmes cadastrados no sistema.

### Página de Favoritos

Apresentará os filmes favoritados pelo usuário conectado.

### Painel Administrativo

Será acessível somente para administradores e permitirá o gerenciamento dos filmes.

## Tecnologias Utilizadas

### Backend

- JavaScript
- Node.js
- Express
- PostgreSQL
- JWT
- bcrypt

### Frontend

- React
- React Router
- Fetch API ou Axios
- CSS

## Requisitos Atendidos

| Requisito | Implementação |
|---|---|
| Backend REST | Node.js + Express |
| PostgreSQL | Banco de dados do sistema |
| Frontend React | Interface do CineMatch |
| Login | Cadastro e login |
| Autenticação JWT | Token para usuários autenticados |
| Usuário comum | Catálogo e favoritos |
| Administrador | Gerenciamento de filmes |
| Senha de administrador | Define o tipo de acesso da conta |
| Relacionamento 1:N | Usuários → Favoritos |
| Relacionamento N:N | Usuários ↔ Filmes |
| CRUD | Cadastro, visualização, edição e exclusão de filmes |
| Upload de arquivo | Capa dos filmes |
| Comunicação Frontend/Backend | React consumindo a API REST |

## Resultado Esperado

O CineMatch deverá permitir que um usuário crie uma conta, faça login, navegue pelo catálogo de filmes, visualize informações sobre os títulos e monte sua própria lista de favoritos.

Os administradores poderão cadastrar, editar, visualizar e excluir filmes, mantendo o catálogo da plataforma atualizado.

O sistema será desenvolvido de forma simples e objetiva, utilizando apenas as funcionalidades necessárias para atender aos requisitos do projeto.
