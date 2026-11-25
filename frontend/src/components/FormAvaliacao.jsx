import { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import "./FormAvaliacao.css";

function FormAvaliacao() {

    const { id } = useParams();

    const [nota, setNota] = useState(0);
    const [comentario, setComentario] = useState("");
    const [enviando, setEnviando] = useState(false);

    async function enviarAvaliacao(event) {
        event.preventDefault();

        if (nota === 0) {
            alert("Escolha uma nota para o filme.");
            return;
        }

        if (comentario.trim() === "") {
            alert("Escreva um comentário sobre o filme.");
            return;
        }

        try {
            setEnviando(true);

            await api.post(`/avaliacoes/${id}`, {
                nota: nota,
                comentario: comentario
            });

            alert("Avaliação enviada com sucesso!");

            setNota(0);
            setComentario("");

        }
        catch (error) {
            console.log("Erro ao enviar avaliação:", error);

            if (error.response?.status === 401) {
                alert("Faça login para avaliar este filme.");
            }
            else {
                alert(
                    error.response?.data?.msg ||
                    "Não foi possível enviar sua avaliação."
                );
            }
        }
        finally {
            setEnviando(false);
        }
    }

    return (
        <div className="form-avaliacao">

            <h2>Deixe sua avaliação</h2>

            <p className="avaliacao-descricao">
                Conte o que você achou desse filme.
            </p>

            <form onSubmit={enviarAvaliacao}>

                <div className="campo-nota">

                    <label>Sua nota:</label>

                    <div className="avaliacao-estrelas">

                        {[1, 2, 3, 4, 5].map((estrela) => (

                            <button
                                type="button"
                                key={estrela}
                                className={
                                    estrela <= nota
                                        ? "estrela selecionada"
                                        : "estrela"
                                }
                                onClick={() => setNota(estrela)}
                            >
                                ★
                            </button>

                        ))}

                    </div>

                    {nota > 0 && (
                        <p>Nota selecionada: {nota}/5</p>
                    )}

                </div>

                <div className="campo-comentario">

                    <label htmlFor="comentario">
                        Seu comentário:
                    </label>

                    <textarea
                        id="comentario"
                        placeholder="Escreva sua opinião sobre o filme..."
                        value={comentario}
                        onChange={(event) => setComentario(event.target.value)}
                        rows="5"
                    />

                </div>

                <button
                    type="submit"
                    className="botao-avaliar"
                    disabled={enviando}
                >
                    {enviando ? "Enviando..." : "Enviar avaliação"}
                </button>

            </form>

        </div>
    );
}

export default FormAvaliacao;
