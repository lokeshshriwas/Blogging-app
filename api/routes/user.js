import express from "express"
import { deleteUser, getUser, getusers, signout, updateUser } from "../controller/userController.js";
import { verifyToken } from "../utils/verifiyUser.js";

const router = express.Router();

router.get("/test", (req, res)=> {
    res.json({message: "APi is working"})
})
router.put('/update/:userId', verifyToken, updateUser)
router.delete('/delete/:userId', verifyToken, deleteUser)
router.post('/signout', signout)
router.get('/getusers', verifyToken, getusers)
router.get("/:userId", getUser)

export default router