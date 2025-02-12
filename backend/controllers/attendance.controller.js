import Attendance from "../models/attendance.model.js";

export const createAttendance = async (req, res) => {
    try {
        const { user, date, isPresent } = req.body;
        const attendance = new Attendance({
            user,
            date,
            isPresent,
        });
        await attendance.save();
        res.status(201).json(attendance);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.find();
        res.status(200).json(attendance);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}