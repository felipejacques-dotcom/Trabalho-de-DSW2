import { useLocation, useNavigate } from "react-router-dom";
import FormAvaliacao from "../components/FormAvaliacao";
import "./DetalhesFilme.css";

function DetalhesFilme() {

    const location = useLocation();
    const navigate = useNavigate();

    const filme = location.state;

    if (!filme) {
        return (
            <div className="filme-nao-encontrado">
                <h2>Filme não encontrado</h2>
                <button onClick={() => navigate("/")}>
                    Voltar para o início
                </button>
            </div>
        );
    }

    return (
        <div className="detalhes-filme">

            <button
                className="botao-voltar"
                onClick={() => navigate("/")}
            >
                Voltar
            </button>

            <div className="detalhes-conteudo">

                <div className="detalhes-capa">
                    <img
                        src={filme.capa}
                        alt={filme.titulo}
                    />
                </div>

                <div className="detalhes-informacoes">

                    <h1>{filme.titulo}</h1>

                    <div className="detalhes-genero">
                        <span>{filme.ano}</span>
                        <span>{filme.genero}</span>
                    </div>

                    <h2>Sinopse</h2>

                    <p>{filme.descricao}</p>

                    <button className="botao-favoritos">
                        Adicionar aos favoritos
                    </button>

                </div>

            </div>

            <FormAvaliacao />

        </div>
    );
}

export default DetalhesFilme;
