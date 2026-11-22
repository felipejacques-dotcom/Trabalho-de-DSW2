import { useState } from "react";
import "./Admin.css";

function Admin() {

    const [filmes, setFilmes] = useState([]);

    const [titulo, setTitulo] = useState("");
    const [ano, setAno] = useState("");
    const [genero, setGenero] = useState("");
    const [descricao, setDescricao] = useState("");
    const [capa, setCapa] = useState("");

    const [editando, setEditando] = useState(null);

    function salvarFilme(event) {
        event.preventDefault();

        if (
            titulo.trim() === "" ||
            ano.trim() === "" ||
            genero.trim() === "" ||
            descricao.trim() === "" ||
            capa.trim() === ""
        ) {
            alert("Preencha todos os campos.");
            return;
        }

        const novoFilme = {
            id: editando !== null ? editando : Date.now(),
            titulo: titulo,
            ano: ano,
            genero: genero,
            descricao: descricao,
            capa: capa
        };

        if (editando !== null) {
            const listaAtualizada = filmes.map((filme) =>
                filme.id === editando ? novoFilme : filme
            );

            setFilmes(listaAtualizada);
            alert("Filme atualizado com sucesso!");
        } else {
            setFilmes([...filmes, novoFilme]);
            alert("Filme cadastrado com sucesso!");
        }

        limparFormulario();
    }

    function editarFilme(filme) {
        setTitulo(filme.titulo);
        setAno(filme.ano);
        setGenero(filme.genero);
        setDescricao(filme.descricao);
        setCapa(filme.capa);

        setEditando(filme.id);
    }

    function excluirFilme(id) {
        const confirmar = window.confirm(
            "Tem certeza que deseja excluir este filme?"
        );

        if (confirmar) {
            const novaLista = filmes.filter(
                (filme) => filme.id !== id
            );

            setFilmes(novaLista);
        }
    }

    function limparFormulario() {
        setTitulo("");
        setAno("");
        setGenero("");
        setDescricao("");
        setCapa("");
        setEditando(null);
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
                                type="text"
                                id="capa"
                                value={capa}
                                onChange={(event) => setCapa(event.target.value)}
                                placeholder="Cole o endereço da imagem"
                            />
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

                    {filmes.length === 0 ? (

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

                                    <img
                                        src={filme.capa}
                                        alt={filme.titulo}
                                    />

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

            </div>

        </div>
    );
}

export default Admin;
