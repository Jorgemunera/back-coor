import { Router } from 'express';
import { getEnabledTransportersController } from './transporters.controller';
// import { authenticate } from '../../middlewares/authMiddleware';
// import { isAdmin } from '../../middlewares/roleMiddleware';
import { getAllTransportersController } from './transporters.controller';

const router = Router();

/**
 * @swagger
 * /api/v1/transporters:
 *   get:
 *     summary: Obtener todos los transportistas
 *     tags: [Transporters]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de todos los transportistas
 *         content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  id:
 *                    type: integer
 *                    example: 1
 *                  name:
 *                    type: string
 *                    example: "Ana Beltrán"
 *                  capacity:
 *                    type: integer
 *                    example: 100
 *                  is_available:
 *                    type: boolean
 *                    example: 1 or 0
 *                  created_at:
 *                    type: string
 *                    format: date-time
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso denegado
 */
router.get('/',
  // authenticate,
  // isAdmin,
  getAllTransportersController
);

/**
 * @swagger
 * /api/v1/transporters/available:
 *   get:
 *     summary: Obtener lista de transportistas disponibles
 *     tags: [Transporters]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de los transportistas disponibles
 *         content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  id:
 *                    type: integer
 *                    example: 1
 *                  name:
 *                    type: string
 *                    example: "Ana Beltrán"
 *                  capacity:
 *                    type: integer
 *                    example: 100
 *                  is_available:
 *                    type: boolean
 *                    example: 1 or 0
 *                  created_at:
 *                    type: string
 *                    format: date-time
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso denegado
 */
router.get('/available',
  // authenticate,
  // isAdmin,
  getEnabledTransportersController
);

export default router;
