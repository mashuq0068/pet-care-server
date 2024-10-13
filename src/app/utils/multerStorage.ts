import multer, { StorageEngine, FileFilterCallback } from 'multer';
import path from 'path';

// Set storage engine
const storage: StorageEngine = multer.diskStorage({
  destination: '../../../src/uploads', // Ensure correct folder path
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

// Check file type
function checkFileType(file: Express.Multer.File, cb: FileFilterCallback) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

// Init upload
const upload = multer({
  storage,
  limits: { fileSize: 1000000 }, // 1MB file size limit
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
});

export const uploadSingle = upload.single('image');
