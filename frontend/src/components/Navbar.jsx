import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

function Navbar() {

    const { autenticado, logout } = useAuth();

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">CineMatch</Link>
            </div>

            <div className="navbar-links">
                <Link to="/">Início</Link>

                <Link to="/favoritos">Favoritos</Link>

                {!autenticado ? (
                    <>
                        <Link to="/login">Entrar</Link>

                        <Link to="/cadastro" className="botao-cadastro">
                            Cadastrar
                        </Link>
                    </>
                ) : (
                    <button onClick={logout} className="botao-sair">
                        Sair
                    </button>
                    
                )}
            </div>
        </nav>
    );
}

export default Navbar;
