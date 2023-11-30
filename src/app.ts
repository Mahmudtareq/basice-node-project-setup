/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
// parser
app.use(express.json());

app.use(cors());

// application route
app.use('/api/v1', router);

const test = (req: Request, res: Response) => {
  res.send('Hello World!');
};

app.use('/', test);
// global error handling

app.use(globalErrorHandler);
// not found
app.use(notFound);

export default app;
