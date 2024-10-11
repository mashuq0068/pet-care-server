// controllers/imageController.ts
import { Request, Response } from 'express';
import { saveImage } from './upload.service';



export const uploadImage = async (req: Request, res: Response): Promise<void> => {
  try {

    if (!req.file) {
      res.status(400).json({ message: 'No file uploaded' });
      return;
    }

    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

    const savedImage = await saveImage(imageUrl);

    res.status(201).json({
      message: 'Image uploaded successfully',
      data: savedImage,
    });
  } catch (err) {
    res.status(500).json({ message: 'Image upload failed', error: (err as {message : string})?.message  });
  }
};
