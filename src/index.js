require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/usuarios", require("./routes/usuarios"));

app.use("/filmes", require("./routes/filmes"));

app.use("/favoritos", require("./routes/favoritos"));

app.use("/avaliacoes", require("./routes/avaliacoes"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "static", "index.html"));
}); 
app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});

