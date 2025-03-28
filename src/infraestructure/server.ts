import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

dotenv.config();

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Quotes API',
      version: '1.0.0',
      description: 'API para gestionar citas',
    },
    servers: [
      {
        url: 'http://localhost:3000', // Cambia esto según tu entorno
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // Cambia esto según la ubicación de tus archivos de rutas
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export const createServer = (): Application => {
  const app = express();

  // Middleware
  app.use(express.json()); // Para parsear cuerpos JSON
  app.use(
    cors({
      origin: (origin, callback) => {
        console.log('Origin recibido:', origin);
        if (!origin || origin === 'https://fitness-study-app.vercel.app') {
          // Permitir solicitudes sin origen (por ejemplo, desde Postman o Swagger UI)
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      methods: ['GET', 'POST', 'PUT'],
    })
  );

  // Swagger
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  return app;
};

export const startServer = (app: Application) => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
  });
};
