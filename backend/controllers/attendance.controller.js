import Attendance from "../models/attendance.model.js";
import Trainee from "../models/trainees.model.js";

// Mark attendance for a trainee
export const markAttendance = async (req, res) => {
    try {
      const attendanceList = Array.isArray(req.body) ? req.body : [req.body];
      console.log("Received attendance list:", attendanceList);
  
      const results = await Promise.all(
        attendanceList.map(async ({ traineeID, status, date }) => {
          console.log("Processing trainee:", traineeID);
  
          // Check if the trainee exists using the custom ID field
          const trainee = await Trainee.findOne({ ID: traineeID });
          if (!trainee) {
            throw new Error(`Trainee with ID ${traineeID} not found`);
          }
  
          // Create a new attendance record
          const attendance = new Attendance({
            traineeID,
            status,
            date: date || Date.now(),
          });
  
          return attendance.save();
        })
      );
  
      res.status(201).json(results);
    } catch (error) {
      console.error("Error marking attendance:", error);
      res.status(500).json({ error: error.message });
    }
  };

// Get attendance history for a specific trainee
export const getTraineeAttendance = async (req, res) => {
    try {
      const { traineeID } = req.params;
  
      // Check if the trainee exists
      const trainee = await Trainee.findOne({ ID: traineeID });
      if (!trainee) {
        return res.status(404).json({ error: "Trainee not found" });
      }
  
      // Fetch all attendance records for the trainee
      const attendanceHistory = await Attendance.find({ traineeID }).sort({ date: -1 });
  
      res.status(200).json(attendanceHistory);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

// Get all attendance history (for all trainees)
export const getAllAttendance = async (req, res) => {
    try {
      // Fetch all attendance records
      const attendanceHistory = await Attendance.find().sort({ date: -1 });
  
      // Manually populate trainee details
      const populatedAttendance = await Promise.all(
        attendanceHistory.map(async (record) => {
          const trainee = await Trainee.findOne({ ID: record.traineeID });
          return {
            ...record.toObject(),
            trainee: trainee ? { Name: trainee.Name, Fieldofstudy: trainee.Fieldofstudy } : null,
          };
        })
      );
  
      res.status(200).json(populatedAttendance);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  export const getDailyAttendance = async (req, res) => {
    try {
      const { date } = req.params;
  
      // Fetch all attendance records for the specified date
      const attendanceRecords = await Attendance.find({ date });
  
      res.status(200).json(attendanceRecords);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };