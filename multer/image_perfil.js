import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: './public/uploads/perfil',
  filename: (req, file, callback) => {
    callback(null, 'imagem_' + Date.now() + path.extname(file.originalname));
  },
});

const uploadPerfil = multer({ storage: storage });

export { uploadPerfil };
