import { Link } from "react-router-dom";
import "./Cadastro.css";

function Cadastro() {
    return (
        <div className="pagina-cadastro">
            <div className="cadastro-container">

                <h1>Crie sua conta</h1>

                <p className="cadastro-descricao">
                    Faça parte do CineMatch e descubra novos filmes.
                </p>

                <form className="form-cadastro">

                    <div className="campo-cadastro">
                        <label htmlFor="nome">Nome</label>
                        <input
                            type="text"
                            id="nome"
                            placeholder="Digite seu nome"
                            required
                        />
                    </div>

                    <div className="campo-cadastro">
                        <label htmlFor="email-cadastro">E-mail</label>
                        <input
                            type="email"
                            id="email-cadastro"
                            placeholder="Digite seu e-mail"
                            required
                        />
                    </div>

                    <div className="campo-cadastro">
                        <label htmlFor="senha-cadastro">Senha</label>
                        <input
                            type="password"
                            id="senha-cadastro"
                            placeholder="Crie uma senha"
                            required
                        />
                    </div>

                    <div className="campo-cadastro">
                        <label htmlFor="confirmar-senha">Confirmar senha</label>
                        <input
                            type="password"
                            id="confirmar-senha"
                            placeholder="Digite sua senha novamente"
                            required
                        />
                    </div>

                    <button type="submit" className="botao-cadastro">
                        Criar conta
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
