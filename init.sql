CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    tipo VARCHAR(20) NOT NULL DEFAULT 'usuario', CHECK (tipo IN ('usuario', 'admin'))
);

CREATE TABLE IF NOT EXISTS filmes (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    sinopse VARCHAR(1000),
    ano INTEGER,
    genero VARCHAR(50),
    diretor VARCHAR(100),
    capa BYTEA,
    capa_tipo VARCHAR(50) -- capa_tipo pra dizer se é image/jpeg ou png
);

CREATE TABLE IF NOT EXISTS favoritos (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL,
    filme_id INTEGER NOT NULL,
    UNIQUE (usuario_id, filme_id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (filme_id) REFERENCES filmes(id)
);

INSERT INTO usuarios (nome, email, senha, tipo) VALUES ('Joao', 'joao@email.com', '123456', 'usuario'), ('Maria', 'maria@email.com', '123456', 'admin');

INSERT INTO filmes (titulo, sinopse, ano, genero, diretor, capa) VALUES ('Matrix', 'Um programador descobre uma realidade simulada.', 1999, 'Ficcao cientifica', 'Lana e Lilly Wachowski', 'matrix.jpg'), ('Titanic', 'Um romance a bordo do Titanic.', 1997, 'Romance', 'James Cameron', 'titanic.jpg'), ('Interestelar', 'Uma equipe viaja pelo espaco em busca de um novo lar.', 2014, 'Ficcao cientifica', 'Christopher Nolan', 'interestelar.jpg');

INSERT INTO favoritos (usuario_id, filme_id) VALUES (1, 1), (1, 3), (2, 2);
