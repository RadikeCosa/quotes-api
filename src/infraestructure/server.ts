import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

export const createServer = (): Application => {
  const app = express();

  // Middleware
  app.use(express.json()); // Para parsear cuerpos JSON
  app.use(
    cors({
      origin: 'https://fitness-study-app.vercel.app', // Solo permite este origen
      methods: ['GET', 'POST', 'PUT'], // Métodos permitidos
    })
  );

  // Puerto
  const PORT = process.env.PORT || 3000;

  return app;
};

export const startServer = (app: Application) => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};
