
import { useEffect, useState } from "react";
import CardFilme from "../components/CardFilme";
import api from "../services/api";
import "./Home.css";

function Home() {

    const [filmes, setFilmes] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");

    useEffect(() => {

        async function buscarFilmes() {
            try {
                const resposta = await api.get("/filmes");
                setFilmes(resposta.data);
            }
            catch (error) {
                console.log("Erro ao buscar filmes:", error);
                setErro("Não foi possível carregar os filmes.");
            }
            finally {
                setCarregando(false);
            }
        }

        buscarFilmes();

    }, []);

    return (
        <div className="home">

            <section className="home-introducao">
                <h1>Bem-vindo ao CineMatch</h1>

                <p>
                    Descubra novos filmes, conheça histórias diferentes
                    e encontre seu próximo filme favorito.
                </p>
            </section>

            <section className="home-filmes">

                <h2>Filmes em destaque</h2>

                <div className="lista-filmes">

                    {carregando && <p>Carregando filmes...</p>}

                    {erro && <p>{erro}</p>}

                    {!carregando && !erro && filmes.length === 0 && (
                        <p>Nenhum filme cadastrado.</p>
                    )}

                    {filmes.map((filme) => (
                        <CardFilme
                            key={filme.id}
                            id={filme.id}
                            titulo={filme.titulo}
                            genero={filme.genero}
                            ano={filme.ano}
                            descricao={filme.sinopse}
                            capa={
                                filme.possui_capa
                                    ? `http://localhost:3000/filmes/${filme.id}/capa`
                                    : null
                            }
                        />
                    ))}

                </div>

            </section>

        </div>
    );
}

export default Home;
