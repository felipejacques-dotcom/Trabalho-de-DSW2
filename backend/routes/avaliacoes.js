
const express = require("express");
const router = express.Router();
const db = require("../db");
const { autenticar, somenteAdmin } = require("../middleware/autenticacao");

// listar todas as avaliações (somente administrador)
router.get("/", autenticar, somenteAdmin, async (req, res) => {
    try {
        const r = await db.query(`
            SELECT
                avaliacoes.id,
                usuarios.nome AS usuario_nome,
                filmes.titulo AS filme_titulo,
                avaliacoes.nota,
                avaliacoes.comentario,
                avaliacoes.data_avaliacao
            FROM avaliacoes
            INNER JOIN usuarios ON usuarios.id = avaliacoes.usuario_id
            INNER JOIN filmes ON filmes.id = avaliacoes.filme_id
            ORDER BY avaliacoes.data_avaliacao DESC
        `);

        return res.status(200).json(r.rows);
    }
    catch (error) {
        return res.status(500).json({ msg: error.message });
    }
});

// listar avaliações de um filme
router.get("/filme/:filme_id", async (req, res) => {
    try {
        const r = await db.query(
            "SELECT avaliacoes.*, usuarios.nome AS usuario_nome FROM avaliacoes INNER JOIN usuarios ON usuarios.id=avaliacoes.usuario_id WHERE avaliacoes.filme_id=$1 ORDER BY data_avaliacao DESC",
            [req.params.filme_id]
        );

        return res.status(200).json(r.rows);
    }
    catch (error) {
        return res.status(500).json({ msg: error.message });
    }
});

// cadastrar avaliação (uma por usuário em cada filme)
router.post("/:filme_id", autenticar, async (req, res) => {
    try {
        const { nota, comentario } = req.body;

        if (nota === undefined || Number(nota) < 0 || Number(nota) > 10 || isNaN(Number(nota)))
            throw new Error("nota deve ser de 0 a 10");

        const filme = await db.query(
            "SELECT id FROM filmes WHERE id=$1",
            [req.params.filme_id]
        );

        if (!filme.rowCount)
            throw new Error("filme não encontrado");

        const existe = await db.query(
            "SELECT id FROM avaliacoes WHERE usuario_id=$1 AND filme_id=$2",
            [req.usuario.id, req.params.filme_id]
        );

        if (existe.rowCount)
            throw new Error("filme ja avaliado");

        const r = await db.query(
            "INSERT INTO avaliacoes(usuario_id, filme_id, nota, comentario) VALUES($1, $2, $3, $4) RETURNING *",
            [req.usuario.id, req.params.filme_id, nota, comentario || null]
        );

        return res.status(201).json({
            msg: "avaliacao cadastrada",
            data: r.rows[0]
        });
    }
    catch (error) {
        return res.status(400).json({ msg: error.message });
    }
});

// alterar própria avaliação
router.put("/:id", autenticar, async (req, res) => {
    try {
        const { nota, comentario } = req.body;

        if (nota !== undefined && (isNaN(Number(nota)) || Number(nota) < 0 || Number(nota) > 10))
            throw new Error("nota deve ser de 0 a 10");

        const atual = await db.query(
            "SELECT * FROM avaliacoes WHERE id=$1 AND usuario_id=$2",
            [req.params.id, req.usuario.id]
        );

        if (!atual.rowCount)
            throw new Error("avaliacao nao encontrada");

        const novaNota = nota === undefined ? atual.rows[0].nota : nota;
        const novoComentario = comentario === undefined ? atual.rows[0].comentario : comentario;

        const r = await db.query(
            "UPDATE avaliacoes SET nota=$1, comentario=$2 WHERE id=$3 RETURNING *",
            [novaNota, novoComentario, req.params.id]
        );

        return res.status(200).json({
            msg: "avaliacao atualizada",
            data: r.rows[0]
        });
    }
    catch (error) {
        return res.status(400).json({ msg: error.message });
    }
});

// excluir avaliação
router.delete("/:id", autenticar, async (req, res) => {
    try {
        let r;

        if (req.usuario.is_admin) {
            // Administrador pode excluir qualquer avaliação
            r = await db.query(
                "DELETE FROM avaliacoes WHERE id=$1 RETURNING *",
                [req.params.id]
            );
        } else {
            // Usuário comum só pode excluir a própria avaliação
            r = await db.query(
                "DELETE FROM avaliacoes WHERE id=$1 AND usuario_id=$2 RETURNING *",
                [req.params.id, req.usuario.id]
            );
        }

        if (!r.rowCount)
            throw new Error("avaliacao nao encontrada");

        return res.status(200).json({ msg: "avaliacao removida" });
    }
    catch (error) {
        return res.status(400).json({ msg: error.message });
    }
});

module.exports = router;
