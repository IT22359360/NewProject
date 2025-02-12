import express from "express";
import { getAttendance, createAttendance } from "../controllers/attendance.controller.js";

const router = express.Router();

router.get ("/",getAttendance);
router.post("/",createAttendance);


export default router;