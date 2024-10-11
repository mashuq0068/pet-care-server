
import { IImage } from './upload.interface';
import Image from './upload.model';

export const saveImage = async (imageUrl: string): Promise<IImage> => {
  try {
    const newImage = new Image({ imageUrl });
    return await newImage.save();
  } catch (err) {
    throw new Error(`Error saving image: ${(err as {message : string}).message}`);
  }
};
