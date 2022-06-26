import 'module-alias/register';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import { dbConnection } from './database/config';
import authRouter from './routes/auth';

dotenv.config();

const app: Express = express();
const port = process.env.PORT ?? 9000;

// DB Connection
void dbConnection();

// * Public directory
app.use(express.static('public'));

// * Reading and parsing body
app.use(express.json());

// * Routes
app.use('/api/v1/auth', authRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
