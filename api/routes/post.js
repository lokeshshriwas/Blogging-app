import express from "express"
import { verifyToken } from "../utils/verifiyUser.js"
import { create, getposts } from "../controller/postController.js"
const router = express.Router()

router.post('/create', verifyToken, create)
router.get('/getposts', getposts)

export default router