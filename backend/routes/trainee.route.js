import express from 'express';

import { getTrainees, createTrainee, getTrainee } from '../controllers/trainees.controller.js';

const router = express.Router();

router.get('/', getTrainees);
router.post('/', createTrainee);
router.get('/get', getTrainee);



export default router;
