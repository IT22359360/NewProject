import Trainee from "../models/trainees.model.js";

export const createTrainee = async (req, res) => {
    try {
        const { ID, Name, Fieldofstudy } = req.body;
        const trainee = new Trainee({
            ID,
            Name,
            Fieldofstudy,
        });
        await trainee.save();
        res.status(201).json(trainee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getTrainees = async (req, res) => {
    try {
        const { group } = req.query; // Get group from query parameter
        let trainees;

        if (group) {
            // If group is provided, filter trainees based on Fieldofstudy
            trainees = await Trainee.find({ Fieldofstudy: group });
        } else {
            // If no group is provided, return all trainees
            trainees = await Trainee.find();
        }

        res.status(200).json(trainees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getTrainee = async (req, res) => {
    try {
        const trainee = await Trainee.find();
        
        res.status(200).json(trainee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

