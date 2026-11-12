const multer = require("multer");
const tiposPermitidos = ["image/jpeg", "image/png", "image/webp"];

const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: (req, file, cb) => {
        if (!tiposPermitidos.includes(file.mimetype)) {
            return cb(new Error("formato invalido, só jpg, png ou webp."));
        }
        return cb(null, true);
    },
    limits: { fileSize: 5 * 1024 * 1024 }
});

module.exports = upload;

