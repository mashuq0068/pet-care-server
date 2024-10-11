// controllers/imageController.ts
import { Request, Response } from 'express';
import { saveImage } from './upload.service';
import catchAsync from '../../utils/catchAsync';
 // Adjust the import based on your project structure

export const uploadImage = catchAsync(async (req: Request, res: Response): Promise<void> => {
  if (!req.file) {
    res.status(400).json({ message: 'No file uploaded' });
    return;
  }

  const imageUrl = `https://pet-care-server-pi.vercel.app/uploads/${req.file.filename}`;

  const savedImage = await saveImage(imageUrl);

  res.status(201).json({
    message: 'Image uploaded successfully',
    data: savedImage,
  });
});
