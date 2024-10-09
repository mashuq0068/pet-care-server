import { Schema, Types, model } from 'mongoose'
import { IUser, IUserModelMethods } from './user.interface'
import bcrypt from 'bcrypt'
import config from '../../config'

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'name is required'],
    },
    email: {
      type: String,
      required: [true, 'email is required'],
      unique: true,
      match: [/.+@.+\..+/, 'Please enter a valid email address'],
    },
    password: {
      type: String,
      required: [true, 'password is required'],
      select: 0,
    },
    role: {
      type: String,
      // required: [true, 'role is required'],
      default:"user",
      enum: {
        values: ['user', 'admin'],
        message: '{VALUE} is not valid role',
      },
    },
    image : {
      type : String,
      required : [true , "image is required"],
    },
    following: {
      type : [Types.ObjectId],
      default: [],
      ref:'User'
    },
    followers : {
      type : [Types.ObjectId],
      default: [],
      ref:'User'
    },
    isPremium : {
      type : Boolean,
      default:false
    }
  },
  {
    timestamps: true,
  },
)
userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  )
  next()
})
userSchema.post('save', async function (doc, next) {
  doc.password = '###'
  next()
})
userSchema.statics.isUserExist = async function (email: string) {
  const user = await User.findOne({ email: email })
  return user
}
userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number,
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimestamp;
};

userSchema.statics.isPasswordMatched = async function (
  email: string,
  password: string,
) {
  const user = await User.findOne({ email: email }).select('+password')
  const result = await bcrypt.compare(password, user?.password as string)
  return result
}
export const User = model<IUser, IUserModelMethods>('User', userSchema)

export default userSchema
