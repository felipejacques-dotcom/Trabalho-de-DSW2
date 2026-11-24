
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import FormAvaliacao from "../components/FormAvaliacao";
import "./DetalhesFilme.css";

function DetalhesFilme() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [filme, setFilme] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");

    useEffect(() => {

        async function buscarFilme() {
            try {
                const resposta = await api.get(`/filmes/${id}`);
                setFilme(resposta.data);
            }
            catch (error) {
                console.log("Erro ao buscar filme:", error);
                setErro("Filme não encontrado.");
            }
            finally {
                setCarregando(false);
            }
        }

        buscarFilme();

    }, [id]);

    if (carregando) {
        return <p>Carregando filme...</p>;
    }

    if (erro || !filme) {
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
                    {filme.possui_capa && (
                        <img
                            src={`http://localhost:3000/filmes/${filme.id}/capa`}
                            alt={filme.titulo}
                        />
                    )}
                </div>

                <div className="detalhes-informacoes">

                    <h1>{filme.titulo}</h1>

                    <div className="detalhes-genero">
                        <span>{filme.ano}</span>
                        <span>{filme.genero}</span>
                    </div>

                    <h2>Sinopse</h2>

                    <p>{filme.sinopse}</p>

                    <h2>Diretor</h2>

                    <p>{filme.diretor}</p>

                    <h2>Avaliação média</h2>

                    <p>
                        {Number(filme.media).toFixed(1)} / 10
                        ({filme.total_avaliacoes} avaliações)
                    </p>

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
