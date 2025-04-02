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
        url: process.env.RENDER_EXTERNAL_URL || 'http://localhost:3000', //
      },
    ],
  },
  apis: ['./dist/infraestructure/routes/*.js'],
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
        console.log(swaggerSpec);

        if (origin === 'https://fitness-study-app.vercel.app') {
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
