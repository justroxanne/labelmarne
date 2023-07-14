const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/'); //dossier de destination
    },
    filename: function (req, file, cb) {
        //génére un nom de fichier unique
        const timestamp = Date.now();
        const filename= `${timestamp}-${file.originalname}`;  
        cb(null, filename); //nom du fichier
    }
});

const upload = multer({ storage: storage });

module.exports = upload;