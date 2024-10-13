import { Schema, model, Types } from 'mongoose'

// Comment Schema
const commentSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: String,
      required: [true, 'Comment cannot be empty'],
    },
  },
  {
    timestamps: true,
  },
)

// Post Schema
const postSchema = new Schema(
  {
  
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    author: {
      type: Types.ObjectId,
      ref: 'User',
    },
    category: {
      type: String,
      enum: ['tip', 'story'],
      required: [true, 'Category is required'],
    },
    image: {
      type: String,
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
    upvotes: {
      type: [Types.ObjectId],
      ref: 'User',
      default: [],
    },
    downvotes: {
      type: [Types.ObjectId],
      ref: 'User',
      default: [],
    },
    comments: {
      type : [commentSchema],
      default:[]
    },
    
   
  },
  {
    timestamps: true,
  },
)

// Pre-save hook to update the `updatedAt` timestamp on updates
postSchema.pre('findOneAndUpdate', function (next) {
  this.set({ updatedAt: new Date() })
  next()
})

// Virtual to get upvote/downvote counts
postSchema.virtual('upvoteCount').get(function () {
  return this.upvotes.length
})

postSchema.virtual('downvoteCount').get(function () {
  return this.downvotes.length
})

// Model Export
const Post = model('Post', postSchema)
export default Post
