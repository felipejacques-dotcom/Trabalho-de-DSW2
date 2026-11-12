# Trabalho de DSW2 — Site de Avaliação de Filmes

# CineMatch

## 1. Sobre o Projeto

O CineMatch é uma aplicação web voltada para a descoberta, avaliação e organização de filmes.

A plataforma permitirá que os usuários criem uma conta, façam login, visualizem um catálogo de filmes, avaliem os títulos disponíveis e adicionem seus filmes favoritos a uma lista pessoal.

O sistema terá dois tipos de acesso: usuário comum e administrador. O usuário comum poderá utilizar as funcionalidades relacionadas à consulta, avaliação e organização dos filmes, enquanto o administrador terá acesso às funções de gerenciamento do catálogo.

O projeto será composto por um backend desenvolvido em JavaScript com Node.js e Express, responsável pela API REST e pela comunicação com o banco de dados PostgreSQL, e por um frontend desenvolvido em React, responsável pela interface utilizada pelos usuários.

## 2. Objetivo

O objetivo do CineMatch é oferecer uma plataforma simples para que os usuários possam consultar filmes, visualizar suas informações, registrar avaliações e organizar seus filmes favoritos, enquanto o administrador poderá manter o catálogo atualizado.

## 3. Tipos de Usuário

O sistema contará com dois tipos de usuários: usuário comum e administrador.

### Usuário Comum

O usuário comum poderá:

- Criar uma conta;
- Fazer login;
- Visualizar o catálogo de filmes;
- Visualizar os detalhes de um filme;
- Adicionar filmes aos favoritos;
- Remover filmes dos favoritos;
- Visualizar sua lista de filmes favoritos;
- Avaliar filmes;
- Editar ou excluir suas próprias avaliações.

### Administrador

O administrador terá acesso às mesmas funcionalidades do usuário comum, além das funções de gerenciamento do catálogo.

Para que uma conta tenha acesso de administrador, será necessário informar uma senha de administrador durante o cadastro.

O backend verificará essa senha e, caso esteja correta, a conta será cadastrada com o campo `is_admin` definido como `TRUE`. Caso a senha não seja informada ou esteja incorreta, a conta será cadastrada como usuário comum, com `is_admin` definido como `FALSE`.

O administrador poderá:

- Cadastrar filmes;
- Editar filmes;
- Excluir filmes;
- Visualizar todos os filmes cadastrados.

## 4. Catálogo de Filmes

O CineMatch possuirá um catálogo contendo os filmes cadastrados pelos administradores.

Cada filme terá informações como:

- Título;
- Sinopse;
- Ano de lançamento;
- Gênero;
- Diretor;
- Capa.

Os filmes serão apresentados no catálogo de forma organizada. Ao selecionar um filme, o usuário poderá visualizar suas informações completas, além das avaliações realizadas por outros usuários.

## 5. Filmes Favoritos

Os usuários poderão adicionar filmes à sua lista de favoritos e removê-los quando desejarem.

Cada usuário terá sua própria lista de favoritos, que poderá ser acessada pela página "Meus Favoritos".

### Relacionamento N:N

A funcionalidade de favoritos representará um relacionamento muitos-para-muitos (N:N) entre usuários e filmes.

Um usuário poderá favoritar vários filmes e um filme poderá ser favoritado por vários usuários.

Esse relacionamento será representado pela tabela `favoritos`, que armazenará os identificadores do usuário e do filme.

**Representação:**

USUÁRIO N -------- N FILME

A tabela FAVORITOS será responsável por estabelecer esse relacionamento.

## 6. Sistema de Avaliações

O CineMatch permitirá que os usuários registrem avaliações sobre os filmes disponíveis no catálogo.

Cada avaliação poderá conter:

- Nota;
- Comentário;
- Data da avaliação;
- Identificador do usuário;
- Identificador do filme.

O usuário poderá editar ou excluir suas próprias avaliações.

As avaliações serão exibidas na página de detalhes de cada filme, permitindo que outros usuários conheçam as opiniões registradas na plataforma.

### Relacionamento 1:N

A funcionalidade de avaliações estabelecerá relacionamentos de um-para-muitos (1:N).

Um usuário poderá realizar várias avaliações, mas cada avaliação pertencerá a apenas um usuário.

Da mesma forma, um filme poderá receber várias avaliações, mas cada avaliação estará relacionada a apenas um filme.

**Representação:**

USUÁRIO 1 -------- N AVALIAÇÕES

FILME 1 -------- N AVALIAÇÕES

A tabela `avaliacoes` será responsável por representar esses relacionamentos.

## 7. Sistema de Login e Autenticação

O sistema possuirá cadastro e login de usuários.

Durante o cadastro serão informados:

- Nome;
- E-mail;
- Senha;
- Senha de administrador, caso o usuário queira criar uma conta administrativa.

A senha do usuário será criptografada utilizando a biblioteca bcrypt antes de ser armazenada no banco de dados.

O campo destinado à senha criptografada será do tipo `VARCHAR(60)`.

Após realizar o login, o backend verificará as credenciais e gerará um JWT (JSON Web Token) para identificar o usuário autenticado.

O token será utilizado para acessar funcionalidades que exigem autenticação.

O sistema também verificará o campo `is_admin` para determinar quais funcionalidades poderão ser acessadas.

### Fluxo de acesso

CADASTRO

↓

Nome + E-mail + Senha

↓

Senha de administrador foi informada?

↓

SIM → Senha correta? → `is_admin = TRUE`

NÃO → `is_admin = FALSE`

↓

LOGIN

↓

Verificação das credenciais

↓

Geração do JWT

↓

Sistema identifica o usuário e suas permissões.

## 8. Upload de Arquivos

O sistema terá uma funcionalidade de upload de arquivos para as capas dos filmes.

Ao cadastrar ou editar um filme, o administrador poderá enviar uma imagem que será utilizada como capa no catálogo.

O arquivo será enviado pelo frontend para o backend e armazenado em uma pasta do projeto destinada às imagens.

No banco de dados, o campo `capa` armazenará o caminho ou nome do arquivo, permitindo que o sistema localize e apresente a imagem quando necessário.

Dessa forma, as imagens não serão armazenadas diretamente no banco de dados.

## 9. Gerenciamento de Filmes

Somente administradores poderão modificar o catálogo.

O administrador poderá realizar as seguintes operações:

**Cadastrar:** adicionar um novo filme ao catálogo.

**Visualizar:** consultar os filmes cadastrados.

**Editar:** alterar as informações de um filme.

**Excluir:** remover um filme do catálogo.

Essas operações formarão o CRUD de filmes.

## 10. Banco de Dados

O banco de dados será desenvolvido utilizando PostgreSQL.

O sistema contará com quatro tabelas principais: `usuarios`, `filmes`, `favoritos` e `avaliacoes`.

### 10.1. Tabela usuarios

Armazena as informações das contas cadastradas.

| Campo | Tipo | Descrição |
|---|---|---|
| id | SERIAL PRIMARY KEY | Identificador do usuário |
| nome | VARCHAR(100) | Nome do usuário |
| email | VARCHAR(150) UNIQUE | E-mail |
| senha | VARCHAR(60) | Senha criptografada com bcrypt |
| is_admin | BOOLEAN DEFAULT FALSE | Indica se é administrador |

### 10.2. Tabela filmes

Armazena as informações dos filmes disponíveis no catálogo.

| Campo | Tipo | Descrição |
|---|---|---|
| id | SERIAL PRIMARY KEY | Identificador do filme |
| titulo | VARCHAR(150) | Título |
| sinopse | TEXT | Sinopse |
| ano | INTEGER | Ano de lançamento |
| genero | VARCHAR(100) | Gênero |
| diretor | VARCHAR(100) | Diretor |
| capa | VARCHAR(255) | Caminho ou nome do arquivo da capa |

### 10.3. Tabela favoritos

Relaciona os usuários aos filmes adicionados aos favoritos.

| Campo | Tipo | Descrição |
|---|---|---|
| id | SERIAL PRIMARY KEY | Identificador |
| usuario_id | INTEGER | Identificador do usuário |
| filme_id | INTEGER | Identificador do filme |

Os campos `usuario_id` e `filme_id` serão chaves estrangeiras, relacionadas às tabelas `usuarios` e `filmes`.

Também será utilizada uma restrição UNIQUE em conjunto com esses dois campos, impedindo que o mesmo usuário favorite o mesmo filme mais de uma vez.

### 10.4. Tabela avaliacoes

Armazena as avaliações realizadas pelos usuários sobre os filmes.

| Campo | Tipo | Descrição |
|---|---|---|
| id | SERIAL PRIMARY KEY | Identificador da avaliação |
| usuario_id | INTEGER | Identificador do usuário |
| filme_id | INTEGER | Identificador do filme |
| nota | NUMERIC(2,1) | Nota atribuída ao filme |
| comentario | TEXT | Comentário do usuário |
| data_avaliacao | TIMESTAMP DEFAULT CURRENT_TIMESTAMP | Data da avaliação |

Os campos `usuario_id` e `filme_id` serão chaves estrangeiras, relacionadas às tabelas `usuarios` e `filmes`.

Cada avaliação pertencerá a um único usuário e a um único filme.

Também será utilizada uma restrição UNIQUE em conjunto com `usuario_id` e `filme_id`, permitindo que cada usuário tenha apenas uma avaliação por filme.

## 11. Relacionamentos do Banco de Dados

O banco de dados possuirá os relacionamentos necessários para atender aos requisitos da atividade.

### Relacionamento N:N — Usuários e Filmes

Um usuário poderá favoritar vários filmes e um filme poderá ser favoritado por vários usuários.

A tabela `favoritos` será responsável por representar esse relacionamento.

USUÁRIOS N -------- N FILMES

　　　　　FAVORITOS

### Relacionamento 1:N — Usuários e Avaliações

Um usuário poderá realizar várias avaliações, mas cada avaliação pertencerá a apenas um usuário.

USUÁRIOS 1 -------- N AVALIAÇÕES

### Relacionamento 1:N — Filmes e Avaliações

Um filme poderá receber várias avaliações, mas cada avaliação estará relacionada a apenas um filme.

FILMES 1 -------- N AVALIAÇÕES

Dessa forma, o banco de dados possuirá tanto o relacionamento N:N quanto os relacionamentos 1:N exigidos na atividade.

## 12. API REST

O backend disponibilizará uma API REST para permitir a comunicação entre o frontend React e o banco de dados.

### Usuários

POST /usuarios — Cadastrar usuário.

POST /usuarios/login — Realizar login.

### Filmes

GET /filmes — Listar filmes.

GET /filmes/:id — Visualizar detalhes de um filme.

POST /filmes — Cadastrar filme (administrador).

PUT /filmes/:id — Editar filme (administrador).

DELETE /filmes/:id — Excluir filme (administrador).

### Favoritos

GET /favoritos — Listar favoritos do usuário autenticado.

POST /favoritos/:filme_id — Adicionar filme aos favoritos.

DELETE /favoritos/:filme_id — Remover filme dos favoritos.

### Avaliações

GET /avaliacoes/filme/:filme_id — Listar avaliações de um filme.

POST /avaliacoes/:filme_id — Cadastrar avaliação.

PUT /avaliacoes/:id — Editar avaliação própria.

DELETE /avaliacoes/:id — Excluir avaliação própria.

As rotas que exigirem autenticação utilizarão o JWT. As operações administrativas serão protegidas por uma verificação adicional do campo `is_admin`.

## 13. Frontend

O frontend será desenvolvido utilizando React e será responsável pela interface do CineMatch.

As principais páginas serão:

- `/login`
- `/cadastro`
- `/filmes`
- `/filmes/:id`
- `/favoritos`
- `/admin`

### Página Inicial

Apresentará o catálogo de filmes disponíveis.

### Página de Login

Permitirá que usuários cadastrados entrem no sistema.

### Página de Cadastro

Permitirá criar uma nova conta e definir se ela será de usuário comum ou administrador por meio da senha de administrador.

### Página de Filmes

Apresentará os filmes cadastrados no sistema.

### Página de Detalhes do Filme

Apresentará as informações completas do filme, as avaliações realizadas pelos usuários e a opção de adicionar aos favoritos.

### Página de Favoritos

Apresentará os filmes favoritados pelo usuário conectado.

### Painel Administrativo

Será acessível somente para administradores e permitirá o gerenciamento dos filmes.

## 14. Tecnologias Utilizadas

**Backend**

- JavaScript;
- Node.js;
- Express;
- PostgreSQL;
- JWT;
- bcrypt.

**Frontend**

- React;
- React Router;
- Fetch API ou Axios;
- CSS.

## 15. Requisitos Atendidos

| Requisito | Implementação |
|---|---|
| Backend REST | Node.js + Express |
| PostgreSQL | Banco de dados do sistema |
| Frontend React | Interface do CineMatch |
| Login | Cadastro e login |
| Autenticação JWT | Token para usuários autenticados |
| Usuário comum | Catálogo, favoritos e avaliações |
| Administrador | Gerenciamento de filmes |
| Senha de administrador | Define o acesso administrativo |
| Relacionamento 1:N | Usuários → Avaliações e Filmes → Avaliações |
| Relacionamento N:N | Usuários ↔ Filmes (favoritos) |
| CRUD | Cadastro, visualização, edição e exclusão de filmes |
| Upload de arquivo | Envio de capas dos filmes |
| Comunicação Frontend/Backend | React consumindo a API REST |

## 16. Resultado Esperado

O CineMatch deverá permitir que um usuário crie uma conta, faça login, navegue pelo catálogo de filmes, visualize informações sobre os títulos, registre avaliações e monte sua própria lista de favoritos.

Os administradores poderão cadastrar, editar, visualizar e excluir filmes, mantendo o catálogo da plataforma atualizado.

O sistema será desenvolvido de forma simples e objetiva, utilizando as funcionalidades necessárias para atender aos requisitos do projeto e os relacionamentos adequados no banco de dados.