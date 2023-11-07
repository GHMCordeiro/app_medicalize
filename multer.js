import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: './public/imgPerfil',
  filename: (req, file, callback) => {
    callback(null, 'imagem_' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

export { upload };
