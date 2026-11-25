
import { useEffect, useState } from "react";
import api from "../services/api";
import "./Admin.css";

function Admin() {

    const [filmes, setFilmes] = useState([]);
    const [avaliacoes, setAvaliacoes] = useState([]);

    const [titulo, setTitulo] = useState("");
    const [ano, setAno] = useState("");
    const [genero, setGenero] = useState("");
    const [diretor, setDiretor] = useState("");
    const [descricao, setDescricao] = useState("");
    const [capa, setCapa] = useState(null);

    const [editando, setEditando] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [carregandoAvaliacoes, setCarregandoAvaliacoes] = useState(true);

    async function buscarFilmes() {
        try {
            const resposta = await api.get("/filmes");
            setFilmes(resposta.data);
        }
        catch (error) {
            console.log("Erro ao buscar filmes:", error);
            alert("Não foi possível carregar os filmes.");
        }
        finally {
            setCarregando(false);
        }
    }

    async function buscarAvaliacoes() {
        try {
            const resposta = await api.get("/avaliacoes");
            setAvaliacoes(resposta.data);
        }
        catch (error) {
            console.log("Erro ao buscar avaliações:", error);
            alert("Não foi possível carregar as avaliações.");
        }
        finally {
            setCarregandoAvaliacoes(false);
        }
    }

    useEffect(() => {
        buscarFilmes();
        buscarAvaliacoes();
    }, []);

    async function salvarFilme(event) {
        event.preventDefault();

        if (
            titulo.trim() === "" ||
            String(ano).trim() === "" ||
            genero.trim() === "" ||
            diretor.trim() === "" ||
            descricao.trim() === ""
        ) {
            alert("Preencha todos os campos.");
            return;
        }

        if (Number(ano) < 0) {
            alert("O ano de lançamento não pode ser negativo.");
            return;
        }

        if (editando === null && !capa) {
            alert("Selecione a imagem do filme.");
            return;
        }

        const dados = new FormData();

        dados.append("titulo", titulo);
        dados.append("ano", ano);
        dados.append("genero", genero);
        dados.append("diretor", diretor);
        dados.append("sinopse", descricao);

        if (capa) {
            dados.append("capa", capa);
        }

        try {
            if (editando !== null) {
                await api.put(`/filmes/${editando}`, dados);
                alert("Filme atualizado com sucesso!");
            }
            else {
                await api.post("/filmes", dados);
                alert("Filme cadastrado com sucesso!");
            }

            limparFormulario();
            await buscarFilmes();
        }
        catch (error) {
            console.log("Erro ao salvar filme:", error);
            alert(error.response?.data?.msg || "Não foi possível salvar o filme.");
        }
    }

    function editarFilme(filme) {
        setTitulo(filme.titulo);
        setAno(String(filme.ano || ""));
        setGenero(filme.genero || "");
        setDiretor(filme.diretor || "");
        setDescricao(filme.sinopse || "");
        setCapa(null);

        setEditando(filme.id);
    }

    async function excluirFilme(id) {
        const confirmar = window.confirm(
            "Tem certeza que deseja excluir este filme?"
        );

        if (confirmar) {
            try {
                await api.delete(`/filmes/${id}`);

                alert("Filme excluído com sucesso!");

                if (editando === id) {
                    limparFormulario();
                }

                await buscarFilmes();
                await buscarAvaliacoes();
            }
            catch (error) {
                console.log("Erro ao excluir filme:", error);
                alert(error.response?.data?.msg || "Não foi possível excluir o filme.");
            }
        }
    }

    async function excluirAvaliacao(id) {
        const confirmar = window.confirm(
            "Tem certeza que deseja excluir esta avaliação? Essa ação não poderá ser desfeita."
        );

        if (confirmar) {
            try {
                await api.delete(`/avaliacoes/${id}`);

                alert("Avaliação excluída com sucesso!");

                await buscarAvaliacoes();
            }
            catch (error) {
                console.log("Erro ao excluir avaliação:", error);
                alert(
                    error.response?.data?.msg ||
                    "Não foi possível excluir a avaliação."
                );
            }
        }
    }

    function limparFormulario() {
        setTitulo("");
        setAno("");
        setGenero("");
        setDiretor("");
        setDescricao("");
        setCapa(null);
        setEditando(null);

        const campoCapa = document.getElementById("capa");

        if (campoCapa) {
            campoCapa.value = "";
        }
    }

    function formatarData(data) {
        return new Date(data).toLocaleString("pt-BR");
    }

    return (
        <div className="pagina-admin">

            <div className="admin-introducao">
                <h1>Painel administrativo</h1>
                <p>
                    Gerencie os filmes disponíveis na plataforma CineMatch.
                </p>
            </div>

            <div className="admin-conteudo">

                <section className="admin-formulario">

                    <h2>
                        {editando !== null
                            ? "Editar filme"
                            : "Cadastrar novo filme"}
                    </h2>

                    <form onSubmit={salvarFilme}>

                        <div className="admin-campo">
                            <label htmlFor="titulo">Título do filme</label>
                            <input
                                type="text"
                                id="titulo"
                                value={titulo}
                                onChange={(event) => setTitulo(event.target.value)}
                                placeholder="Digite o título"
                            />
                        </div>

                        <div className="admin-campo">
                            <label htmlFor="ano">Ano de lançamento</label>
                            <input
                                type="number"
                                id="ano"
                                min="0"
                                value={ano}
                                onChange={(event) => setAno(event.target.value)}
                                placeholder="Ex: 2024"
                            />
                        </div>

                        <div className="admin-campo">
                            <label htmlFor="genero">Gênero</label>
                            <input
                                type="text"
                                id="genero"
                                value={genero}
                                onChange={(event) => setGenero(event.target.value)}
                                placeholder="Ex: Drama / Suspense"
                            />
                        </div>

                        <div className="admin-campo">
                            <label htmlFor="diretor">Diretor</label>
                            <input
                                type="text"
                                id="diretor"
                                value={diretor}
                                onChange={(event) => setDiretor(event.target.value)}
                                placeholder="Digite o nome do diretor"
                            />
                        </div>

                        <div className="admin-campo">
                            <label htmlFor="descricao">Sinopse</label>
                            <textarea
                                id="descricao"
                                value={descricao}
                                onChange={(event) => setDescricao(event.target.value)}
                                placeholder="Digite a sinopse do filme"
                                rows="5"
                            />
                        </div>

                        <div className="admin-campo">
                            <label htmlFor="capa">Imagem do filme</label>
                            <input
                                type="file"
                                id="capa"
                                accept="image/*"
                                onChange={(event) => setCapa(event.target.files[0] || null)}
                            />

                            {editando !== null && (
                                <p>
                                    Selecione uma nova imagem somente se quiser substituir a capa atual.
                                </p>
                            )}
                        </div>

                        <div className="admin-botoes">

                            <button type="submit" className="botao-salvar">
                                {editando !== null
                                    ? "Salvar alterações"
                                    : "Cadastrar filme"}
                            </button>

                            {editando !== null && (
                                <button
                                    type="button"
                                    className="botao-cancelar"
                                    onClick={limparFormulario}
                                >
                                    Cancelar
                                </button>
                            )}

                        </div>

                    </form>

                </section>

                <section className="admin-lista">

                    <h2>Filmes cadastrados</h2>

                    {carregando ? (

                        <p>Carregando filmes...</p>

                    ) : filmes.length === 0 ? (

                        <div className="admin-vazio">
                            <h3>Nenhum filme cadastrado</h3>
                            <p>
                                Os filmes adicionados aparecerão nesta área.
                            </p>
                        </div>

                    ) : (

                        <div className="admin-filmes">

                            {filmes.map((filme) => (

                                <div className="admin-card" key={filme.id}>

                                    {filme.possui_capa && (
                                        <img
                                            src={`http://localhost:3000/filmes/${filme.id}/capa`}
                                            alt={filme.titulo}
                                        />
                                    )}

                                    <div className="admin-card-info">

                                        <h3>{filme.titulo}</h3>

                                        <p>
                                            {filme.genero} | {filme.ano}
                                        </p>

                                        <div className="admin-card-botoes">

                                            <button
                                                className="botao-editar"
                                                onClick={() => editarFilme(filme)}
                                            >
                                                Editar
                                            </button>

                                            <button
                                                className="botao-excluir"
                                                onClick={() => excluirFilme(filme.id)}
                                            >
                                                Excluir
                                            </button>

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </section>

                <section className="admin-lista admin-avaliacoes">

                    <h2>Avaliações dos usuários</h2>

                    {carregandoAvaliacoes ? (

                        <p>Carregando avaliações...</p>

                    ) : avaliacoes.length === 0 ? (

                        <div className="admin-vazio">
                            <h3>Nenhuma avaliação cadastrada</h3>
                            <p>
                                As avaliações feitas pelos usuários aparecerão nesta área.
                            </p>
                        </div>

                    ) : (

                        <div className="admin-lista-avaliacoes">

                            {avaliacoes.map((avaliacao) => (

                                <div className="admin-avaliacao-card" key={avaliacao.id}>

                                    <div className="admin-avaliacao-topo">

                                        <div>
                                            <h3>{avaliacao.filme_titulo}</h3>
                                            <p>
                                                Avaliado por: {avaliacao.usuario_nome}
                                            </p>
                                        </div>

                                        <span className="admin-nota">
                                            {Number(avaliacao.nota).toFixed(1)}/5
                                        </span>

                                    </div>

                                    <div className="admin-avaliacao-comentario">

                                        <strong>Comentário:</strong>

                                        <p>
                                            {avaliacao.comentario || "Nenhum comentário escrito."}
                                        </p>

                                    </div>

                                    <span className="admin-avaliacao-data">
                                        {formatarData(avaliacao.data_avaliacao)}
                                    </span>

                                    <button
                                        className="botao-excluir"
                                        onClick={() => excluirAvaliacao(avaliacao.id)}
                                    >
                                        Excluir avaliação
                                    </button>

                                </div>

                            ))}

                        </div>

                    )}

                </section>

            </div>

        </div>
    );
}

export default Admin;
