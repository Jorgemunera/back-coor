import { Router } from 'express';
import { registerController, loginController } from './auth.controller';
import { validateSchema } from '../../shared/middlewares/validator.handler';
import { registerSchema } from './schemas/register.schema';
import { loginSchema } from './schemas/login.schema';

const router = Router();

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Registro de usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Register'
 *     responses:
 *       201:
 *         description: Usuario registrado
 *       400:
 *         description: Datos inválidos
 */
router.post('/register',
  validateSchema(registerSchema),
  registerController
);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login de usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: Login exitoso, devuelve token
 *       401:
 *         description: Credenciales inválidas
 */
router.post('/login',
  validateSchema(loginSchema),
  loginController
);

export default router;
