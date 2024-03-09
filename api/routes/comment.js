import express from "express"
import { verifyToken } from "../utils/verifiyUser.js"
import { createComment, getPostComments, likeComment } from "../controller/commentController.js"

const router = express.Router()

router.post("/create", verifyToken ,createComment)
router.get("/getPostComments/:postId", getPostComments)
router.put(`/likeComment/:commentId`, verifyToken, likeComment)
export default router