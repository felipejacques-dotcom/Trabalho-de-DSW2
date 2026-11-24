const jwt = require("jsonwebtoken");
function autenticar(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        req.usuario = jwt.verify(token, process.env.JWT_SECRET);
        next();
    }
    catch (error) {
        return res.status(401).json({ msg: "token errado ou nao digitado" });
    }
}
function somenteAdmin(req, res, next) {
    if (!req.usuario.is_admin) {
        return res.status(403).json({ msg: "acesso só para ADMs" });
    }
    next();
}

module.exports = { autenticar, somenteAdmin };

