// src/modules/reports/routes.ts
import { Router } from 'express';
import { authenticate } from '../../shared/middlewares/auth.handler';
import { isAdmin } from '../../shared/middlewares/checkRole.handler';
import { getReportsController } from './reports.controller';

const router = Router();

/**
 * @swagger
 * /api/v1/reports/orders:
 *   get:
 *     summary: Obtener reporte detallado de órdenes
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Fecha inicial (YYYY-MM-DD)
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Fecha final (YYYY-MM-DD)
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [En espera, En tránsito, Entregado]
 *         description: Estado de la orden para filtrar
 *       - in: query
 *         name: transporterId
 *         schema:
 *           type: integer
 *         description: ID del transportista
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Página de resultados
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Resultados por página
 *     responses:
 *       200:
 *         description: Reporte generado exitosamente
 *       400:
 *         description: Error en los parámetros enviados
 */

router.get('/orders',
  authenticate,
  isAdmin,
  getReportsController
);


export default router;
