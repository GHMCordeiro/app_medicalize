import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: './public/uploads/med',
  filename: (req, file, callback) => {
    callback(null, 'imagem_' + Date.now() + path.extname(file.originalname));
  },
});

const uploadMed = multer({ storage: storage });

export { uploadMed };
