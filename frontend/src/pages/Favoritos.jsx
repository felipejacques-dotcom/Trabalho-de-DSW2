import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Favoritos.css";

function Favoritos() {

    const navigate = useNavigate();

    const [filmesFavoritos, setFilmesFavoritos] = useState(() => {
        const favoritosSalvos = localStorage.getItem("filmesFavoritos");

        return favoritosSalvos ? JSON.parse(favoritosSalvos) : [];
    });

    function removerFavorito(titulo) {
        const novaLista = filmesFavoritos.filter(
            (filme) => filme.titulo !== titulo
        );

        setFilmesFavoritos(novaLista);

        localStorage.setItem(
            "filmesFavoritos",
            JSON.stringify(novaLista)
        );
    }

    function verDetalhes(filme) {
        navigate("/detalhes", {
            state: filme
        });
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

                {filmesFavoritos.length === 0 ? (

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

                            <div className="card-favorito" key={filme.titulo}>

                                <img
                                    src={filme.capa}
                                    alt={filme.titulo}
                                />

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
                                        onClick={() => removerFavorito(filme.titulo)}
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
