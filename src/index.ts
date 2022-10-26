import 'module-alias/register';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import { dbConnection } from './database/config';
import authRouter from './routes/auth';
import eventsRouter from './routes/events';

dotenv.config();

const app: Express = express();
const port = process.env.PORT ?? 9000;

// DB Connection
void dbConnection();

// CORS
app.use(cors());

// * Public directory
app.use(express.static('public'));

// * Reading and parsing body
app.use(express.json());

// * Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/events', eventsRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
