import express from "express"
import { verifyToken } from "../utils/verifiyUser.js"
import { create, deletepost, getposts } from "../controller/postController.js"
const router = express.Router()

router.post('/create', verifyToken, create)
router.get('/getposts', getposts)
router.delete('/deletepost/:postId/:userId', verifyToken, deletepost)

export default router