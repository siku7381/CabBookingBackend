import express from "express";
import { createDriver, getDriver, updateDriver } from "../controllers/driver.js";

const router = express.Router();

router.post('/createDriver',createDriver);
router.get('/getDriver',getDriver);
router.patch('/updateDriver/:id',updateDriver);

export default router;