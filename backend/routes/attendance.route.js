import express from "express";
import { markAttendance, getTraineeAttendance, getAllAttendance } from "../controllers/attendance.controller.js";

const router = express.Router();

// Mark attendance for a trainee
router.post("/attendance/mark", markAttendance);

// Get attendance records for a specific trainee
router.get("/attendance/trainee/:traineeID", getTraineeAttendance);

// Get all attendance records
router.get("/attendance", getAllAttendance);

export default router;