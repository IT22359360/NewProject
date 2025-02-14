import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
    traineeID: {
        type: String,
        required: true,
        ref: "Trainee",
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ["Present", "Absent"],
        required: true,
    },
});

const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance;