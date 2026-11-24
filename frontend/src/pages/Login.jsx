import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Login.css";

function Login() {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const { login, carregando } = useContext(AuthContext);

    const navigate = useNavigate();

    async function fazerLogin(event) {
        event.preventDefault();

        const sucesso = await login(email, senha);

        if (sucesso) {
            navigate("/");
        }
    }

    return (
        <div className="pagina-login">
            <div className="login-container">

                <h1>Bem-vindo de volta!</h1>

                <p className="login-descricao">
                    Entre na sua conta para continuar explorando o CineMatch.
                </p>

                <form className="form-login" onSubmit={fazerLogin}>

                    <div className="campo-login">
                        <label htmlFor="email">E-mail</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Digite seu e-mail"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                        />
                    </div>

                    <div className="campo-login">
                        <label htmlFor="senha">Senha</label>
                        <input
                            type="password"
                            id="senha"
                            placeholder="Digite sua senha"
                            value={senha}
                            onChange={(event) => setSenha(event.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="botao-login"
                        disabled={carregando}
                    >
                        {carregando ? "Entrando..." : "Entrar"}
                    </button>

                </form>

                <p className="login-cadastro">
                    Ainda não tem uma conta?
                    <Link to="/cadastro"> Cadastre-se</Link>
                </p>

                <Link to="/" className="login-voltar">
                    Voltar para o início
                </Link>

            </div>
        </div>
    );
}

export default Login;
