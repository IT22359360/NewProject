import Attendance from "../models/attendance.model.js";
import Trainee from "../models/trainees.model.js";

// Mark attendance for a trainee
export const markAttendance = async (req, res) => {
    try {
        const { traineeID, status, date } = req.body;

        // Check if the trainee exists
        const trainee = await Trainee.findById(traineeID);
        if (!trainee) {
            return res.status(404).json({ error: "Trainee not found" });
        }

        // Create a new attendance record
        const attendance = new Attendance({
            traineeID,
            status,
            date: date || Date.now(), // Use provided date or default to current date
        });

        await attendance.save();
        res.status(201).json(attendance);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get attendance history for a specific trainee
export const getTraineeAttendance = async (req, res) => {
    try {
        const { traineeID } = req.params;

        // Check if the trainee exists
        const trainee = await Trainee.findById(traineeID);
        if (!trainee) {
            return res.status(404).json({ error: "Trainee not found" });
        }

        // Get all attendance records for the trainee
        const attendanceHistory = await Attendance.find({ traineeID }).sort({ date: -1 }); // Sort by date in descending order

        res.status(200).json(attendanceHistory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all attendance history (for all trainees)
export const getAllAttendance = async (req, res) => {
    try {
        const attendanceHistory = await Attendance.find()
            .populate("traineeID", "Name Fieldofstudy") // Populate trainee details
            .sort({ date: -1 }); // Sort by date in descending order

        res.status(200).json(attendanceHistory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};