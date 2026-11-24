
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import DetalhesFilme from "./pages/DetalhesFilme";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Favoritos from "./pages/Favoritos";
import Admin from "./pages/Admin";

import "./App.css";

function App() {
    return (
        <div className="App">

            <Navbar />

            <Routes>

                <Route path="/" element={<Home />} />

                <Route
                    path="/detalhes/:id"
                    element={<DetalhesFilme />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/cadastro"
                    element={<Cadastro />}
                />

                <Route
                    path="/favoritos"
                    element={<Favoritos />}
                />

                <Route
                    path="/admin"
                    element={<Admin />}
                />

            </Routes>

        </div>
    );
}

export default App;
