import express from "express";
import { verifyToken } from "../utils/verifiyUser.js";
import {
  bookmarkPost,
  create,
  deletepost,
  getposts,
  myBookmarks,
  updatepost,
} from "../controller/postController.js";
const router = express.Router();

router.post("/create", verifyToken, create);
router.get("/getposts", getposts);
router.delete("/deletepost/:postId/:userId", verifyToken, deletepost);
router.put("/updatepost/:postId/:userId", verifyToken, updatepost);
router.put(`/bookmark/:postId`, verifyToken, bookmarkPost);
router.get(`/mybookmarks`, verifyToken, myBookmarks )

export default router;
