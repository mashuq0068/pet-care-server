import express from 'express'
import { authRoutes } from '../modules/auth/auth.route'
import { userRoutes } from '../modules/user/user.route'
import { postRoutes } from '../modules/post/post.route'
import { uploadRoutes } from '../modules/upload/upload.route'

const router = express.Router()

const routes = [
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path:'/posts',
    route:postRoutes
  },
  {
    path:'/upload-image',
    route:uploadRoutes
  }
 
]
routes.forEach((route) => router.use(route.path, route.route))
export const allRoutes = router
