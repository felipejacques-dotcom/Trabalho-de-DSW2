import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Favoritos.css";

function Favoritos() {

    const navigate = useNavigate();

    const [filmesFavoritos, setFilmesFavoritos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");

    useEffect(() => {

        async function buscarFavoritos() {
            try {
                const resposta = await api.get("/favoritos");
                setFilmesFavoritos(resposta.data);
            }
            catch (error) {
                console.log("Erro ao buscar favoritos:", error);
                setErro("Não foi possível carregar seus favoritos.");
            }
            finally {
                setCarregando(false);
            }
        }

        buscarFavoritos();

    }, []);

    async function removerFavorito(id) {

        try {
            await api.delete(`/favoritos/${id}`);

            const novaLista = filmesFavoritos.filter(
                (filme) => filme.id !== id
            );

            setFilmesFavoritos(novaLista);

        }
        catch (error) {
            console.log("Erro ao remover favorito:", error);
            alert(error.response?.data?.msg || "Não foi possível remover o filme dos favoritos.");
        }
    }

    function verDetalhes(filme) {
        navigate(`/detalhes/${filme.id}`);
    }

    if (carregando) {
        return <p>Carregando favoritos...</p>;
    }

    return (
        <div className="pagina-favoritos">

            <div className="favoritos-introducao">
                <h1>Meus favoritos</h1>

                <p>
                    Aqui estão os filmes que você guardou na sua lista.
                </p>
            </div>

            <div className="favoritos-conteudo">

                <h2>Minha lista</h2>

                {erro ? (

                    <div className="favoritos-vazio">
                        <h3>{erro}</h3>
                    </div>

                ) : filmesFavoritos.length === 0 ? (

                    <div className="favoritos-vazio">
                        <h3>Sua lista está vazia</h3>

                        <p>
                            Você ainda não adicionou nenhum filme aos favoritos.
                        </p>

                        <button
                            onClick={() => navigate("/")}
                            className="botao-explorar"
                        >
                            Explorar filmes
                        </button>
                    </div>

                ) : (

                    <div className="lista-favoritos">

                        {filmesFavoritos.map((filme) => (

                            <div className="card-favorito" key={filme.id}>

                                {filme.capa && (
                                    <img
                                        src={`http://localhost:3000/filmes/${filme.id}/capa`}
                                        alt={filme.titulo}
                                    />
                                )}

                                <div className="card-favorito-info">

                                    <h3>{filme.titulo}</h3>

                                    <p>
                                        {filme.genero} | {filme.ano}
                                    </p>

                                    <button
                                        className="botao-ver-detalhes"
                                        onClick={() => verDetalhes(filme)}
                                    >
                                        Ver detalhes
                                    </button>

                                    <button
                                        className="botao-remover-favorito"
                                        onClick={() => removerFavorito(filme.id)}
                                    >
                                        Remover dos favoritos
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
}

export default Favoritos;
