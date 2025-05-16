import express from 'express';

import authRouter from './auth.router.ts';
import usersRouter from './users.router.ts';
import ordersRouter from './orders.router.ts';
import routesRouter from './routes.router.ts';
import transportersRouter from './transporters.router.ts';


export function routerApi(app: express.Application): void{
  // Raiz
  const router = express.Router();
  app.use('/api/v1', router);

  // Rutas
  router.use('auth', authRouter);
  router.use('users', usersRouter);
  router.use('orders', ordersRouter);
  router.use('routes', routesRouter);
  router.use('transporters', transportersRouter);
}
