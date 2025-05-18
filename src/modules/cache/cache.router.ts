// src/modules/cache/routes.ts
import { Router } from 'express';
import { authenticate } from '../../shared/middlewares/auth.handler';
import { isAdmin } from '../../shared/middlewares/checkRole.handler';
import { clearOrderStatusCacheController, clearReportsCacheController, getAllCacheKeysController } from './cache.controller';

const router = Router();

/**
 * @swagger
 * /api/v1/cache/keys:
 *   get:
 *     summary: Listar todas las claves en Redis
 *     tags: [Cache]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de claves en Redis
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 keys:
 *                   type: array
 *                   items:
 *                     type: string
 *       500:
 *         description: Error interno al obtener las claves
 */
router.get('/keys',
  authenticate,
  isAdmin,
  getAllCacheKeysController
);

/**
 * @swagger
 * /api/v1/cache/reports:
 *   delete:
 *     summary: Eliminar la caché de reportes de órdenes
 *     tags: [Cache]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cache eliminada correctamente
 *       500:
 *         description: Error al eliminar la caché
 */
router.delete('/reports',
  authenticate,
  isAdmin,
  clearReportsCacheController
);

/**
 * @swagger
 * /api/v1/cache/orders/status:
 *   delete:
 *     summary: Eliminar la caché del estado de órdenes
 *     tags: [Cache]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Caché de estado eliminada correctamente
 *       500:
 *         description: Error al eliminar la caché
 */
router.delete('/orders/status',
  authenticate,
  isAdmin,
  clearOrderStatusCacheController
);

export default router;
