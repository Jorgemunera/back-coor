import { Router } from 'express';
import { authenticate } from '../../shared/middlewares/auth.handler';
import { createOrderController, getOrderHistoryController, getOrdersController } from './orders.controller';
import { getOrderStatusController } from './orders.controller';
import { createOrderSchema } from './schemas/createOrder.schema';
import { validateSchema } from '../../shared/middlewares/validator.handler';

const router = Router();

/**
 * @swagger
 * /api/v1/orders:
 *   get:
 *     summary: Listar órdenes
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [En espera, En tránsito, Entregado]
 *         description: Estado del envío para filtrar
 *     responses:
 *       200:
 *         description: Lista de órdenes
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso denegado
 */
router.get('/',
  authenticate,
  getOrdersController
);

/**
 * @swagger
 * /api/v1/orders/{id}/status:
 *   get:
 *     summary: Obtener estado actual de una orden
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la orden
 *     responses:
 *       200:
 *         description: Estado actual retornado correctamente
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Orden no encontrada
 */
router.get('/:id/status',
  authenticate,
  getOrderStatusController
);

/**
 * @swagger
 * /api/v1/orders/{id}/history:
 *   get:
 *     summary: Obtener historial de estados de una orden
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la orden
 *     responses:
 *       200:
 *         description: Historial de la orden retornado correctamente
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Orden no encontrada
 */
router.get('/:id/history',
  authenticate,
  getOrderHistoryController
);


/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Crear nueva orden de envío
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateOrder'
 *     responses:
 *       201:
 *         description: Orden creada correctamente
 *       400:
 *         description: Datos inválidos
 */
router.post(
  '/',
  authenticate,
  validateSchema(createOrderSchema),
  createOrderController
);


export default router;
