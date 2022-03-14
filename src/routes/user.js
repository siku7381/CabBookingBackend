import express from "express";
import { bookCab, createUser, getUser, loginUser } from "../controllers/user.js";

const router = express.Router();

router.post('/createUser',createUser);
router.get('/getUser',getUser);
router.post('/loginUser',loginUser);
router.get('/bookCab/:id',bookCab);

export default router;