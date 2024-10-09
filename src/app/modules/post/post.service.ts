import { Types } from 'mongoose';
import Post from './post.model';
import { IPost } from './post.interface'; // Assuming you have an IPost interface

// get a single post by ID
const getPostsBySingleUserFromDB = async (id: string) => {
  const result = await Post.findById(id).populate('author')
  return result;
};

// get all posts 
const getAllPostsFromDB = async (filter: Partial<IPost> = {}) => {
  const result = await Post.find(filter).populate('author', 'name').sort({ createdAt: -1 });
  return result;
};

// Create a new post
const createPostInDB = async (postData: Partial<IPost>, authorId: Types.ObjectId) => {
  const newPost = new Post({
    ...postData,
    author: authorId,
  });
  const result = await newPost.save();
  return result;
};

// Update a post
const updatePostInDB = async (postId: string, authorId: Types.ObjectId, postData: Partial<IPost>) => {
  const result = await Post.findOneAndUpdate(
    { _id: postId, author: authorId },
    { $set: postData },
    { new: true, runValidators: true },
  );
  return result;
};

// Delete a post 
const deletePostFromDB = async (postId: string, authorId: Types.ObjectId) => {
  const result = await Post.findOneAndDelete({ _id: postId, author: authorId });
  return result;
};

// Add a comment to a post
const addCommentToPostInDB = async (postId: string, userId: Types.ObjectId, content: string) => {
  const result = await Post.findByIdAndUpdate(
    postId,
    {
      $push: {
        comments: { user: userId, content },
      },
    },
    { new: true, runValidators: true },
  ).populate('comments.user');
  return result;
};

// Upvote or downvote a post
const voteOnPostInDB = async (postId: string, userId: Types.ObjectId, isUpvote: boolean) => {
  const updateField = isUpvote ? 'upvotes' : 'downvotes';
  const oppositeField = isUpvote ? 'downvotes' : 'upvotes';
  await Post.findByIdAndUpdate(postId, {
    $pull: { [oppositeField]: userId },
  });

  const result = await Post.findByIdAndUpdate(
    postId,
    { $addToSet: { [updateField]: userId } },
    { new: true }
  )
  return result;
};

export const postServices = {
  getPostsBySingleUserFromDB,
  getAllPostsFromDB,
  createPostInDB,
  updatePostInDB,
  deletePostFromDB,
  addCommentToPostInDB,
  voteOnPostInDB,
};
