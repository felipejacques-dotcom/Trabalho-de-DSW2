
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">CineMatch</Link>
            </div>

            <div className="navbar-links">
                <Link to="/">Início</Link>
                <Link to="/favoritos">Favoritos</Link>
                <Link to="/login">Entrar</Link>
                <Link to="/cadastro" className="botao-cadastro">
                    Cadastrar
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;
