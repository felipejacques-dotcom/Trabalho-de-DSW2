const express = require("express");
const router = express.Router();
const db = require("../db");
const { autenticar } = require("../middleware/autenticacao");


// lista favoritos usuario logado
router.get("/", autenticar, async (req, res) => {
    try {
        const r = await db.query("SELECT filmes.* FROM filmes INNER JOIN favoritos ON filmes.id=favoritos.filme_id WHERE favoritos.usuario_id=$1 ORDER BY filmes.titulo", [req.usuario.id]);
        return res.status(200).json(r.rows);
    }
    catch (error) {
        return res.status(500).json({ msg: error.message });
    }
});

// adiciona filme favoritos
router.post("/:filme_id", autenticar, async (req, res) => {
    try {
        const filme = await db.query("SELECT id FROM filmes WHERE id=$1", [req.params.filme_id]);
        if (!filme.rowCount)
            throw new Error("filme nao encontrado");

        const existe = await db.query("SELECT id FROM favoritos WHERE usuario_id=$1 AND filme_id=$2", [req.usuario.id, req.params.filme_id]);
        if (existe.rowCount)
            throw new Error("filme ja ta nos favoritos");

        const r = await db.query("INSERT INTO favoritos(usuario_id, filme_id) VALUES($1, $2) RETURNING *", [req.usuario.id, req.params.filme_id]);
        return res.status(201).json({ msg: "filme adicionado ao favoritos", data: r.rows[0] });
    }
    catch (error) {
        return res.status(400).json({ msg: error.message });
    }
});

// remover um filme do favoritos
router.delete("/:filme_id", autenticar, async (req, res) => {
    try {
        const r = await db.query("DELETE FROM favoritos WHERE usuario_id=$1 AND filme_id=$2 RETURNING *", [req.usuario.id, req.params.filme_id]);
        if (!r.rowCount)
            throw new Error("favorito nao encontrado");

        return res.status(200).json({ msg: "filme removido dos favoritos" });
    }
    catch (error) {
        return res.status(400).json({ msg: error.message });
    }
});

module.exports = router;

