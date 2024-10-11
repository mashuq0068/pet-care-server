import { Router } from 'express';
import { upload } from '../../utils/multerStorage';
import { uploadImage } from './upload.controller';


const router = Router();


router.post('/upload', upload.single('image'), uploadImage);

export default router;
