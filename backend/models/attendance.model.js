import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    isPresent: {
        type: Boolean,
        required: true,
    },
}, {
    timestamps: true,
}
        );

        const Attendance = mongoose.model("Attendance", attendanceSchema);

        export default Attendance;