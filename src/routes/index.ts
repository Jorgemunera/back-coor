import express from 'express';

import swaggerUi from "swagger-ui-express";
import swaggerSpec from "../docs/swagger.config.ts";

import authRouter from '../modules/auth/auth.router.ts';
// import usersRouter from '../modules/users/users.router.ts';
import ordersRouter from '../modules/orders/orders.router.ts';
import routesRouter from '../modules/routes/routes.router.ts';
import transportersRouter from '../modules/transporters/transporters.router.ts';
import reportsRouter from '../modules/reports/reports.router.ts';
import cacheRouter from '../modules/cache/cache.router.ts';


export function routerApi(app: express.Application): void{
  // Raiz
  const router = express.Router();
  app.use('/api/v1', router);

  // Rutas
  router.use('/auth', authRouter);
  // router.use('/users', usersRouter);
  router.use('/orders', ordersRouter);
  router.use('/routes', routesRouter);
  router.use('/transporters', transportersRouter);
  router.use('/reports', reportsRouter);
  router.use('/cache', cacheRouter);
  router.use('/doc-api', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
