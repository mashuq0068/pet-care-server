import { model, Schema } from 'mongoose'
import { IImage } from './upload.interface'

const imageSchema = new Schema<IImage>(
  {
    imageUrl: { type: String, required: true },
  },
  {
    timestamps: true,
  },
)


export default model<IImage>('Image', imageSchema)
