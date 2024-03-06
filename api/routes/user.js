import express from "express"
import { updateUser } from "../controller/userController.js";
import { verifyToken } from "../utils/verifiyUser.js";

const router = express.Router();

router.get("/test", (req, res)=> {
    res.json({message: "APi is working"})
})
router.put('/update/:userId', verifyToken, updateUser)

export default router