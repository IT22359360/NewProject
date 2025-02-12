import mongoose from "mongoose";

const traineeSchema = new mongoose.Schema({
    ID: {
        type: String,
        required: true,
    },
    Name: {
        type: String,
        required: true,
    },
    Fieldofstudy: {
        type: String,
        required: true,
    },
   

}, {
    timestamps: true,
}
        );

const Trainee = mongoose.model("Trainee", traineeSchema);

export default Trainee;