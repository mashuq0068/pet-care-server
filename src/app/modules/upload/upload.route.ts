import { Router } from 'express';
import {  uploadSingle } from '../../utils/multerStorage';
import { uploadImage } from './upload.controller';


const router = Router();


router.post('/', uploadSingle, uploadImage);

export const uploadRoutes = router
