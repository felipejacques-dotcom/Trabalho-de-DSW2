
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import DetalhesFilme from "./pages/DetalhesFilme";
import Login from "./pages/Login";

import "./App.css";

function App() {
    return (
        <div className="App">
            <Navbar />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/detalhes" element={<DetalhesFilme />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </div>
    );
}

export default App;
