import { Link } from "react-router-dom";
import "./Login.css";

function Login() {
    return (
        <div className="pagina-login">
            <div className="login-container">

                <h1>Bem-vindo de volta!</h1>

                <p className="login-descricao">
                    Entre na sua conta para continuar explorando o CineMatch.
                </p>

                <form className="form-login">

                    <div className="campo-login">
                        <label htmlFor="email">E-mail</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Digite seu e-mail"
                            required
                        />
                    </div>

                    <div className="campo-login">
                        <label htmlFor="senha">Senha</label>
                        <input
                            type="password"
                            id="senha"
                            placeholder="Digite sua senha"
                            required
                        />
                    </div>

                    <button type="submit" className="botao-login">
                        Entrar
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
