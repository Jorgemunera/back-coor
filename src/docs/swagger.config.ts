import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Envíos',
    version: 'v1',
    description: 'Documentación API envios',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor local de desarrollo',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      CreateOrder: {
        type: 'object',
        required: ['weight', 'dimensions', 'productType', 'destinationAddress'],
        properties: {
          weight: { type: 'number', example: 5.5 },
          dimensions: { type: 'string', example: '25x32x16 cm' },
          productType: { type: 'string', example: 'Juguete' },
          destinationAddress: {
            type: 'string',
            example: 'calle 63b #4-29, Cali',
          },
        },
      },
      AssignOrder: {
        type: 'object',
        required: ['routeId', 'transporterId'],
        properties: {
          routeId: { type: 'integer', example: 1 },
          transporterId: { type: 'integer', example: 3 },
        },
      },
      Register: {
        type: 'object',
        required: ['name', 'email', 'password'],
        properties: {
          name: { type: 'string', example: 'Juan Pérez' },
          email: { type: 'string', example: 'juan@example.com' },
          password: { type: 'string', example: '12345678' },
        },
      },
      Login: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string', example: 'juan@example.com'},
          password: { type: 'string', example: '12345678' },
        },
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./src/modules/**/*.router.ts'],
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
