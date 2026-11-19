
import "./CardFilme.css";

function CardFilme(props) {
    return (
        <div className="card-filme">
            <img 
                src={props.capa} 
                alt={props.titulo} 
                className="card-filme-imagem"
            />

            <div className="card-filme-info">
                <h3>{props.titulo}</h3>

                <p className="card-filme-genero">
                    {props.genero} | {props.ano}
                </p>

                <p className="card-filme-descricao">
                    {props.descricao}
                </p>

                <button className="botao-detalhes">
                    Ver detalhes
                </button>
            </div>
        </div>
    );
}

export default CardFilme;
