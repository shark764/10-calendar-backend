import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';

dotenv.config();

const app: Express = express();
const port = process.env.PORT ?? 9000;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.get('/hello/:name', (req: Request, res: Response) => {
  res.send(`Hello there! ${req.params.name}`);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});

function sum (num1: number, num2: number) {
  return num1 + num2;
}
console.log(sum(8, 4));
