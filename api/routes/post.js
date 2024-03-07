import express from "express"
import { verifyToken } from "../utils/verifiyUser.js"
import { create } from "../controller/postController.js"
const router = express.Router()

router.post('/create', verifyToken, create)

export default router