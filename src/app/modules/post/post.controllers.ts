import { Request, Response } from 'express';
import { postServices } from './post.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const getPostById = catchAsync(async (req: Request, res: Response) => {
  const postId = req.params.id;
  const result = await postServices.getPostsBySingleUserFromDB(postId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Post retrieved successfully',
    data: result,
  });
});

const getAllPosts = catchAsync(async (req: Request, res: Response) => {
  const filter = req.query;
  const result = await postServices.getAllPostsFromDB(filter);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Posts retrieved successfully',
    data: result,
  });
});

const createPost = catchAsync(async (req: Request, res: Response) => {
  const postData = req.body;
  const authorId = req.user.id;
  const result = await postServices.createPostInDB(postData, authorId);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Post created successfully',
    data: result,
  });
});

const updatePost = catchAsync(async (req: Request, res: Response) => {
  const postId = req.params.id;
  const authorId = req.user.id;
  const postData = req.body;
  const result = await postServices.updatePostInDB(postId, authorId, postData);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Post updated successfully',
    data: result,
  });
});

const deletePost = catchAsync(async (req: Request, res: Response) => {
  const postId = req.params.id;
  const authorId = req.user.id;
  const result = await postServices.deletePostFromDB(postId, authorId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Post deleted successfully',
    data: result,
  });
});

const addCommentToPost = catchAsync(async (req: Request, res: Response) => {
  const postId = req.params.id;
  const userId = req.user.id;
  const content = req.body.content;
  const result = await postServices.addCommentToPostInDB(postId, userId, content);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Comment added successfully',
    data: result,
  });
});

const voteOnPost = catchAsync(async (req: Request, res: Response) => {
  const postId = req.params.id;
  const userId = req.user.id;
  const isUpvote = req.body.isUpvote;
  const result = await postServices.voteOnPostInDB(postId, userId, isUpvote);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Vote registered successfully',
    data: result,
  });
});

export const postControllers = {
  getPostById,
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
  addCommentToPost,
  voteOnPost,
};
