import express from "express";
import { bookCab, createUser, getUser } from "../controllers/user.js";

const router = express.Router();

router.post('/createUser',createUser);
router.get('/getUser',getUser);
router.get('/bookCab/:id',bookCab);

export default router;