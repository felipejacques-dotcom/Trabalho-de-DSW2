
import { useNavigate } from "react-router-dom";
import "./CardFilme.css";

function CardFilme(props) {
    const navigate = useNavigate();

    function verDetalhes() {
        navigate(`/detalhes/${props.id}`);
    }

    return (
        <div className="card-filme">

            {props.capa && (
                <img
                    src={props.capa}
                    alt={props.titulo}
                    className="card-filme-imagem"
                />
            )}

            <div className="card-filme-info">

                <h3>{props.titulo}</h3>

                <p className="card-filme-genero">
                    {props.genero} | {props.ano}
                </p>

                <p className="card-filme-descricao">
                    {props.descricao}
                </p>

                <button className="botao-detalhes" onClick={verDetalhes}>
                    Ver detalhes
                </button>

            </div>

        </div>
    );
}

export default CardFilme;
