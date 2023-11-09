import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: './public/uploads/reserve',
  filename: (req, file, callback) => {
    callback(null, 'imagem_' + Date.now() + path.extname(file.originalname));
  },
});

const uploadReserve = multer({ storage: storage });

export { uploadReserve };
