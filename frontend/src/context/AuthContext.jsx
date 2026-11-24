import { createContext, useState } from "react";
import api from "../services/api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [usuario, setUsuario] = useState(() => {
        const usuarioSalvo = localStorage.getItem("usuario");

        return usuarioSalvo ? JSON.parse(usuarioSalvo) : null;
    });

    const [carregando, setCarregando] = useState(false);

    async function login(email, senha) {
        try {
            setCarregando(true);

            const resposta = await api.post("/usuarios/login", {
                email: email,
                senha: senha
            });

            const dados = resposta.data.data;

            const token = dados.token;
            const usuarioLogado = dados.usuario;

            if (!token || !usuarioLogado) {
                throw new Error("Resposta de login inválida.");
            }

            localStorage.setItem("token", token);
            localStorage.setItem("usuario", JSON.stringify(usuarioLogado));

            setUsuario(usuarioLogado);

            return true;

        } catch (error) {
            console.log("Erro no login:", error);

            alert(
                error.response?.data?.msg ||
                "Não foi possível realizar o login."
            );

            return false;

        } finally {
            setCarregando(false);
        }
    }

    function logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");

        setUsuario(null);
    }

    const autenticado = usuario !== null;

    return (
        <AuthContext.Provider
            value={{
                usuario,
                autenticado,
                carregando,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
