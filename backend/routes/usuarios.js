const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { autenticar, somenteAdmin } = require("../middleware/autenticacao");

// cadastro
router.post("/", async (req, res) => {
    try {
        const { nome, email, senha, senha_admin } = req.body;
        if (!nome || !email || !senha) {
            throw new Error("nome, email e senha necessarios");
        }
        if (senha.length < 6) {
            throw new Error("senha tem que ter pelo menos 6 caracteres");
        }
         
        const emailFinal = email.trim().toLowerCase();
        const existe = await db.query("SELECT id FROM usuarios WHERE email=$1", [emailFinal]);
        if (existe.rowCount > 0) {
            throw new Error("email ja cadastrado");
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);
        const admin = Boolean(process.env.ADMIN_REGISTER_PASSWORD && senha_admin === process.env.ADMIN_REGISTER_PASSWORD);


        const r = await db.query("INSERT INTO usuarios(nome, email, senha, is_admin) VALUES($1, $2, $3, $4) RETURNING id, nome, email, is_admin", [nome, emailFinal, senhaCriptografada, admin]);
        return res.status(201).json({ msg: "usuario cadastrado", data: r.rows[0] });
    }
    catch (error) {
        return res.status(400).json({ msg: error.message });
    }
});

// logar
router.post("/login", async (req, res) => {
    try {
        const { email, senha } = req.body;
        if (!email || !senha)
            throw new Error("colocar email e senha");

        const r = await db.query("SELECT * FROM usuarios WHERE email=$1", [email.trim().toLowerCase()]);
        if (r.rowCount === 0)
            throw new Error("email ou senha errado");

        const usuario = r.rows[0];
        const correta = await bcrypt.compare(senha, usuario.senha);
        if (!correta)
            throw new Error("email ou senha errado");
        
        const token = jwt.sign({ id: usuario.id, nome: usuario.nome, email: usuario.email, is_admin: usuario.is_admin }, process.env.JWT_SECRET, { expiresIn: "8h" });
        return res.status(200).json({
            msg: "login feito",
            data: { token, usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email, is_admin: usuario.is_admin } }
        });
    }
    catch (error) {
        return res.status(401).json({ msg: error.message });
    }
});

// perfil logado
router.get("/perfil", autenticar, async (req, res) => {
    try {
        const r = await db.query("SELECT id, nome, email, is_admin FROM usuarios WHERE id=$1", [req.usuario.id]);
        if (!r.rowCount)
            throw new Error("usuario nao encontrado");

        return res.status(200).json(r.rows[0]);
    }
    catch (error) {
        return res.status(400).json({ msg: error.message });
    }
});

// lista usuarios (só adm)
router.get("/", autenticar, somenteAdmin, async (req, res) => {
    try {
        const r = await db.query("SELECT id, nome, email, is_admin FROM usuarios ORDER BY id");
        return res.status(200).json(r.rows);
    }
    catch (error) {
        return res.status(500).json({ msg: error.message });
    }
});

module.exports = router;

