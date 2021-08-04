import express from "express"
import auth from "../middleware/auth.js"
const router = express.Router()

import { createPosts,getPost,getPostBySearch, getPosts,updatePost,deletePost ,likePost} from "../controllers/posts.js"
router.get('/search',getPostBySearch)
router.get('/',getPosts)
router.get('/:id',getPost)
router.post('/',auth,createPosts)
router.patch('/:id',auth,updatePost)
router.delete('/:id',auth,deletePost)
router.patch('/:id/likepost',auth,likePost)
export default router