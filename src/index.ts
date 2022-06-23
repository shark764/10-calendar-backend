import 'module-alias/register';
import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import { getRoute } from './routers/auth/route';
import authRouter from './routes/auth';
import { getDisplayN } from './utilities/any';
import { getName } from './utils';

dotenv.config();

const app: Express = express();
const port = process.env.PORT ?? 9000;

// * Public directory
app.use(express.static('public'));

// * Reading and parsing body
app.use(express.json());

// * Routes
app.use('/api/v1/auth', authRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.get('/hello/:name', (req: Request, res: Response) => {
  res.send(getName(req.params.name));
});

app.get('/hello/json/:name', (req: Request, res: Response) => {
  res.json({
    name: getName(req.params.name),
    ok: true,
    sum: sum(99, 67),
  });
});

app.get('/route/:name', (req: Request, res: Response) => {
  res.send(getRoute(req.params.name));
});

app.get('/route/number/:n', (req: Request, res: Response) => {
  res.send(getDisplayN(Number(req.params.n)));
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});

function sum (num1: number, num2: number) {
  return num1 + num2;
}
console.log(sum(18, 4));
