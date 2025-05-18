import { Router } from 'express';
import { authenticate } from '../../shared/middlewares/auth.handler';
import { assignTransporterController, createOrderController, getAllOrdersHistoryController, getOrderHistoryController, getOrdersController, updateOrderStatusController } from './orders.controller';
import { getOrderStatusController } from './orders.controller';
import { createOrderSchema } from './schemas/createOrder.schema';
import { validateSchema } from '../../shared/middlewares/validator.handler';
import { isAdmin } from '../../shared/middlewares/checkRole.handler';
import { assignTransporterSchema } from './schemas/assignTransporter.schema';

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
 * /api/v1/orders/history/all:
 *   get:
 *     summary: Obtener historial de todas las órdenes
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista del historial de estados de todas las órdenes
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso denegado
 */
router.get('/history/all',
  authenticate,
  isAdmin,
  getAllOrdersHistoryController
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

/**
 * @swagger
 * /api/v1/orders/{id}/status:
 *   put:
 *     summary: Actualizar el estado de una orden
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [En espera, En tránsito, Entregado]
 *                 example: "En tránsito"
 *     responses:
 *       200:
 *         description: Estado actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Estado actualizado correctamente
 *       400:
 *         description: ID inválido o estado no permitido
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso denegado
 *       404:
 *         description: Orden no encontrada
 */
router.put('/:id/status',
  authenticate,
  updateOrderStatusController
);


/**
 * @swagger
 * /api/v1/orders/{id}/assign:
 *   post:
 *     summary: Asignar una orden a un transportista y una ruta
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               routeId:
 *                 type: integer
 *               transporterId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Orden asignada correctamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Solo administradores
 *       404:
 *         description: Orden o transportista no encontrados
 */
router.post(
  '/:id/assign',
  authenticate,
  isAdmin,
  validateSchema(assignTransporterSchema),
  assignTransporterController
);

export default router;
