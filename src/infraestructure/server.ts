import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

dotenv.config();

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Quotes API',
      version: '1.0.0',
      description: 'API for managing quotes',
    },
    servers: [
      {
        url: 'https://fitness-study-app.vercel.app',
      },
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./src/**/*.ts'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export const createServer = (): Application => {
  const app = express();

  app.use(express.json());
  app.use(
    cors({
      origin: ['https://fitness-study-app.vercel.app', 'http://localhost:5173'],
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
    })
  );

  // Configuración de Swagger
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

  return app;
};
