CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha VARCHAR(60) NOT NULL,
    is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS filmes (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    sinopse VARCHAR(1000),
    ano INTEGER,
    genero VARCHAR(50),
    diretor VARCHAR(100),
    capa BYTEA,
    capa_tipo VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS favoritos (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    filme_id INTEGER NOT NULL REFERENCES filmes(id) ON DELETE CASCADE,
    CONSTRAINT unique_favorito UNIQUE (usuario_id, filme_id)
);

CREATE TABLE IF NOT EXISTS avaliacoes (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    filme_id INTEGER NOT NULL REFERENCES filmes(id) ON DELETE CASCADE,
    nota NUMERIC(3,1) NOT NULL CHECK (nota >= 0 AND nota <= 10),
    comentario VARCHAR(1000),
    data_avaliacao TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_avaliacao UNIQUE (usuario_id, filme_id)
);


INSERT INTO usuarios (nome, email, senha, is_admin) VALUES('Joao', 'joao@email.com', '$2b$10$abcdefghijklmnopqrstuu123456789012345678901234567890', FALSE), ('Maria', 'maria@email.com', '$2b$10$abcdefghijklmnopqrstuu123456789012345678901234567890', TRUE);

INSERT INTO filmes (titulo, sinopse, ano, genero, diretor, capa, capa_tipo)VALUES ('Matrix', 'Um programador descobre uma realidade simulada.', 1999, 'Ficcao cientifica', 'Lana e Lilly Wachowski', NULL, NULL), ('Titanic', 'Um romance a bordo do Titanic.', 1997, 'Romance', 'James Cameron', NULL, NULL), ('Interestelar', 'Uma equipe viaja pelo espaco em busca de um novo lar.', 2014, 'Ficcao cientifica', 'Christopher Nolan', NULL, NULL);

INSERT INTO favoritos (usuario_id, filme_id) VALUES (1, 1), (1, 3), (2, 2);


INSERT INTO avaliacoes (usuario_id, filme_id, nota, comentario) VALUES (1, 1, 5, 'Um filme muito interessante.'), (1, 3, 5, 'Uma excelente historia.'), (2, 2, 4, 'Um classico do cinema.');
