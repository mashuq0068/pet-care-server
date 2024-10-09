import express from 'express';
import auth from '../../middlewares/auth';
import { postControllers } from './post.controllers';
import USER_ROLE from '../user/user.constant';
import zodValidation from '../../middlewares/zodValidation';
import { createPostValidationSchema, updatePostValidationSchema } from './post.validation';

const router = express.Router();

router.get(
  '/:id',
  auth(USER_ROLE.user, USER_ROLE.admin),
  postControllers.getPostById
);

router.get(
  '/',
  auth(USER_ROLE.admin , USER_ROLE.user),
  postControllers.getAllPosts
);

router.post(
  '/',
  zodValidation(createPostValidationSchema),
  auth(USER_ROLE.user, USER_ROLE.admin),
  postControllers.createPost
);

router.put(
  '/:id',
  zodValidation(updatePostValidationSchema),
  auth(USER_ROLE.user, USER_ROLE.admin),
  postControllers.updatePost
);

router.delete(
  '/:id',
  auth(USER_ROLE.user, USER_ROLE.admin),
  postControllers.deletePost
);

router.post(
  '/:id/comments',
  auth(USER_ROLE.user, USER_ROLE.admin),
  postControllers.addCommentToPost
);

router.post(
  '/:id/vote',
  auth(USER_ROLE.user, USER_ROLE.admin),
  postControllers.voteOnPost
);

export const postRoutes = router;
