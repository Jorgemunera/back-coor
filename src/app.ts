import express from 'express';
import cors from 'cors'
import { routerApi } from './routes/index';

const app = express();

// midllewares nativos
app.use(express.json());
app.use(cors());

// Routes
routerApi(app);

// middlwares

export default app;
