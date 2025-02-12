import express from 'express';
import dotenv from 'dotenv';
import { connectdb } from './db.js';
import attendanceRouter from './routes/attendance.route.js';
import traineeRouter from './routes/trainee.route.js';
const app = express();

dotenv.config();

app.use(express.json());

app.use("/api/attendance", attendanceRouter);
app.use ("/api/trainee", traineeRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
    connectdb();
})





