import { Request, Response } from 'express';
import { saveImage } from './upload.service';
import catchAsync from '../../utils/catchAsync';

const BASE_URL =  'https://pet-care-server-pi.vercel.app';

export const uploadImage = catchAsync(async (req: Request, res: Response): Promise<void> => {
  if (!req.file) {
    res.status(400).json({ message: 'No file uploaded' });
    return;
  }
  const imageUrl = `${BASE_URL}/uploads/${req.file.filename}`;
  const savedImage = await saveImage(imageUrl);

  res.status(201).json({
    message: 'Image uploaded successfully',
    data: savedImage,
  });
});
