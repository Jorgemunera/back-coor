import { Router } from 'express';
import { getAllRoutesController } from './routes.controller';
import { isAdmin } from '../../shared/middlewares/checkRole.handler';
import { authenticate } from '../../shared/middlewares/auth.handler';

const router = Router();

/**
 * @swagger
 * /api/v1/routes:
 *   get:
 *     summary: Obtener listado de rutas
 *     tags: [Routes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de rutas obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "Ruta Oriente"
 *                   description:
 *                     type: string
 *                     example: "Ruta hacia la zona oriente"
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso denegado
 */
router.get('/',
  authenticate,
  isAdmin,
  getAllRoutesController
);

export default router;
