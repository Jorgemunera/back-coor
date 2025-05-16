import { Router } from 'express';
import { getEnabledTransportersController } from './transporters.controller';
// import { authenticate } from '../../middlewares/authMiddleware';
// import { isAdmin } from '../../middlewares/roleMiddleware';
import { getAllTransportersController } from './transporters.controller';

const router = Router();

/**
 * @swagger
 * /api/transporters:
 *   get:
 *     summary: Obtener todos los transportistas
 *     tags: [Transporters]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de todos los transportistas
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
 * /api/transporters/available:
 *   get:
 *     summary: Obtener lista de transportistas disponibles
 *     tags: [Transporters]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de los transportistas disponibles
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
