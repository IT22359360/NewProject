import express from "express";
import { markAttendance, getTraineeAttendance, getAllAttendance, getDailyAttendance } from "../controllers/attendance.controller.js";

const router = express.Router();

// Mark attendance for a trainee
router.post("/mark", markAttendance);

// Get attendance records for a specific trainee
router.get("/trainee/:traineeID", getTraineeAttendance);

// Get all attendance records
router.get("/", getAllAttendance);
router.get("/daily/:date", getDailyAttendance);


export default router;