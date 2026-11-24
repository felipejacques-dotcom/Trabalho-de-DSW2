import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Cadastro.css";

function Cadastro() {

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [senhaAdmin, setSenhaAdmin] = useState("");
    const [carregando, setCarregando] = useState(false);

    const navigate = useNavigate();

    async function fazerCadastro(event) {
        event.preventDefault();

        if (senha !== confirmarSenha) {
            alert("As senhas não são iguais.");
            return;
        }

        if (senha.length < 6) {
            alert("A senha precisa ter pelo menos 6 caracteres.");
            return;
        }

        try {
            setCarregando(true);

            await api.post("/usuarios", {
                nome: nome,
                email: email,
                senha: senha,
                senha_admin: senhaAdmin
            });

            alert("Cadastro realizado com sucesso!");

            navigate("/login");

        } catch (error) {
            console.log("Erro no cadastro:", error);

            alert(
                error.response?.data?.msg ||
                "Não foi possível realizar o cadastro."
            );

        } finally {
            setCarregando(false);
        }
    }

    return (
        <div className="pagina-cadastro">
            <div className="cadastro-container">

                <h1>Crie sua conta</h1>

                <p className="cadastro-descricao">
                    Faça parte do CineMatch e descubra novos filmes.
                </p>

                <form className="form-cadastro" onSubmit={fazerCadastro}>

                    <div className="campo-cadastro">
                        <label htmlFor="nome">Nome</label>
                        <input
                            type="text"
                            id="nome"
                            placeholder="Digite seu nome"
                            value={nome}
                            onChange={(event) => setNome(event.target.value)}
                            required
                        />
                    </div>

                    <div className="campo-cadastro">
                        <label htmlFor="email-cadastro">E-mail</label>
                        <input
                            type="email"
                            id="email-cadastro"
                            placeholder="Digite seu e-mail"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                        />
                    </div>

                    <div className="campo-cadastro">
                        <label htmlFor="senha-cadastro">Senha</label>
                        <input
                            type="password"
                            id="senha-cadastro"
                            placeholder="Crie uma senha"
                            value={senha}
                            onChange={(event) => setSenha(event.target.value)}
                            required
                        />
                    </div>

                    <div className="campo-cadastro">
                        <label htmlFor="confirmar-senha">Confirmar senha</label>
                        <input
                            type="password"
                            id="confirmar-senha"
                            placeholder="Digite sua senha novamente"
                            value={confirmarSenha}
                            onChange={(event) => setConfirmarSenha(event.target.value)}
                            required
                        />
                    </div>

                    <div className="campo-cadastro">
                        <label htmlFor="senha-admin">
                            Senha de administrador (opcional)
                        </label>
                        <input
                            type="password"
                            id="senha-admin"
                            placeholder="Deixe vazio se não for administrador"
                            value={senhaAdmin}
                            onChange={(event) => setSenhaAdmin(event.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="botao-cadastro"
                        disabled={carregando}
                    >
                        {carregando ? "Cadastrando..." : "Criar conta"}
                    </button>

                </form>

                <p className="cadastro-login">
                    Já possui uma conta?
                    <Link to="/login"> Entrar</Link>
                </p>

                <Link to="/" className="cadastro-voltar">
                    Voltar para o início
                </Link>

            </div>
        </div>
    );
}

export default Cadastro;

