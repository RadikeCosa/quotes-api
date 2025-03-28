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
        url: 'https://fitness-study-app.vercel.app', // URL de producción
      },
      {
        url: 'http://localhost:3000', // URL de desarrollo
      },
    ],
  },
  apis: ['./src/**/*.ts'], // Ruta a tus archivos con anotaciones Swagger
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export const createServer = (): Application => {
  const app = express();

  // Middleware
  app.use(express.json()); // Para parsear cuerpos JSON
  app.use(
    cors({
      origin: ['https://fitness-study-app.vercel.app', 'http://localhost:5173'],
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
    })
  );

  // Swagger
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

  return app;
};

export const startServer = (app: Application) => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Swagger Docs available at http://localhost:${PORT}/api-docs`);
  });
};
