const multer = require('multer'); //pour l'upload de l'image de profil

const storage = multer.diskStorage({
  // définit le dossier de destination et le nom du fichier
  destination: function (req, file, cb) {
    cb(null, './public/uploads/'); // Dossier de destination
  },
  filename: function (req, file, cb) {
    // Génère un nom de fichier unique
    const filename = file.originalname;
    cb(null, filename); // Nom du fichier
  },
});

const upload = multer({ storage: storage }); //utilise le storage pour l'upload

module.exports = upload;
