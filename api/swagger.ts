import swaggerJsdoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.3',
  info: {
    title: 'Car Store API',
    version: '1.0.0',
    description: 'API para gerenciamento de veículos da loja',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Desenvolvimento local',
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
      Veiculo: {
        type: 'object',
        properties: {
          _id: { type: 'string', example: '675edc72f327f83a12c9b0a1' },
          brand: { type: 'string', example: 'Toyota' },
          modelName: { type: 'string', example: 'Corolla' },
          year: { type: 'integer', example: 2020 },
          type: { type: 'string', example: 'Sedan' },
          value: { type: 'number', example: 95000 },
          description: { type: 'string', example: 'Único dono, revisões em dia' },
          status: { type: 'string', enum: ['disponivel', 'vendido'], example: 'disponivel' },
          imagens: {
            type: 'array',
            items: { type: 'string' },
            example: ['http://localhost:3000/uploads/abc.jpg'],
          },
          createdAt: { type: 'string' },
          updatedAt: { type: 'string' },
        },
      },
      VeiculoCreate: {
        type: 'object',
        required: ['brand', 'modelName', 'year', 'type', 'value'],
        properties: {
          brand: { type: 'string' },
          modelName: { type: 'string' },
          year: { type: 'integer' },
          type: { type: 'string', enum: ['SUV','Sedan','Hatch','Convertible','Coupe','Minivan','Pickup Truck','Wagon','Van','Other'] },
          value: { type: 'number' },
          description: { type: 'string' },
        },
      },
    },
  },
};

const options = {
  definition: swaggerDefinition,
  apis: [
    './api/index.ts',
    './api/routes/*.ts',
    './api/controllers/*.ts',
  ],
};

export const swaggerSpec = swaggerJsdoc(options);
