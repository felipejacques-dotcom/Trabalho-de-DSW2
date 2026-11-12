const express = require("express");
const router = express.Router();
const db = require("../db");
const upload = require("../middleware/upload");
const { autenticar, somenteAdmin } = require("../middleware/autenticacao");

// listar filmes
router.get("/", async (req, res) => {
    try {
        const r = await db.query("SELECT id, titulo, sinopse, ano, genero, diretor, (capa IS NOT NULL) AS possui_capa FROM filmes ORDER BY titulo");
        return res.status(200).json(r.rows);
    }
    catch (error) {
        return res.status(500).json({ msg: error.message });
    }
});

// busca filme e media de avaliacao
router.get("/:id", async (req, res) => {
    try {
        const r = await db.query("SELECT filmes.id, titulo, sinopse, ano, genero, diretor, (capa IS NOT NULL) AS possui_capa, COALESCE(AVG(avaliacoes.nota), 0) AS media, COUNT(avaliacoes.id) AS total_avaliacoes FROM filmes LEFT JOIN avaliacoes ON filmes.id=avaliacoes.filme_id WHERE filmes.id=$1 GROUP BY filmes.id", [req.params.id]);
        if (!r.rowCount)
            throw new Error("filme nao encontrado");

        return res.status(200).json(r.rows[0]);
    }
    catch (error) {
        return res.status(400).json({ msg: error.message });
    }
});

// mostra capa
router.get("/:id/capa", async (req, res) => {
    try {
        const r = await db.query("SELECT capa, capa_tipo FROM filmes WHERE id=$1", [req.params.id]);
        if (!r.rowCount || !r.rows[0].capa)
            throw new Error("capa nao encontrada");

        res.set("Content-Type", r.rows[0].capa_tipo);
        return res.send(r.rows[0].capa);
    }
    catch (error) {
        return res.status(404).json({ msg: error.message });
    }
});

// cadastra filme (adm)
router.post("/", autenticar, somenteAdmin, upload.single("capa"), async (req, res) => {
    try {
        const { titulo, sinopse, ano, genero, diretor } = req.body;
        if (!titulo)
            throw new Error("titulo obrigatorio");


        const r = await db.query("INSERT INTO filmes(titulo, sinopse, ano, genero, diretor, capa, capa_tipo) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id, titulo, sinopse, ano, genero, diretor", [titulo, sinopse || null, ano || null, genero || null, diretor || null, req.file ? req.file.buffer : null, req.file ? req.file.mimetype : null]);
        return res.status(201).json({ msg: "filme cadastrado", data: r.rows[0] });
    }
    catch (error) {
        return res.status(400).json({ msg: error.message });
    }
});

// edita filme (adm)
router.put("/:id", autenticar, somenteAdmin, upload.single("capa"), async (req, res) => {
    try {
        const atual = await db.query("SELECT * FROM filmes WHERE id=$1", [req.params.id]);
        if (!atual.rowCount)
            throw new Error("filme nao encontrado");

        const f = atual.rows[0];

        const { titulo, sinopse, ano, genero, diretor } = req.body;
        const r = await db.query("UPDATE filmes SET titulo=$1, sinopse=$2, ano=$3, genero=$4, diretor=$5, capa=$6, capa_tipo=$7 WHERE id=$8 RETURNING id, titulo, sinopse, ano, genero, diretor", [titulo === undefined ? f.titulo : titulo, sinopse === undefined ? f.sinopse : sinopse, ano === undefined ? f.ano : (ano || null), genero === undefined ? f.genero : genero, diretor === undefined ? f.diretor : diretor, req.file ? req.file.buffer : f.capa, req.file ? req.file.mimetype : f.capa_tipo, req.params.id]);
        return res.status(200).json({ msg: "filme atualizado", data: r.rows[0] });
    }
    catch (error) {
        return res.status(400).json({ msg: error.message });
    }
});

// remove filme(adm)
router.delete("/:id", autenticar, somenteAdmin, async (req, res) => {
    try {
        const r = await db.query("DELETE FROM filmes WHERE id=$1 RETURNING *", [req.params.id]);
        if (!r.rowCount)
            throw new Error("filme nao encontrado");

        return res.status(200).json({ msg: "filme removido" });
    }
    catch (error) {
        return res.status(400).json({ msg: error.message });
    }
});

module.exports = router;

