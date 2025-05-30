import { connectDB } from './infraestructure/database/db';
import { seedDB } from './infraestructure/database/seed';
import { MongoQuoteRepository } from './infraestructure/repositories/quote.repository';
import { createServer, startServer } from './infraestructure/server';
import { createQuoteRoutes } from './infraestructure/routes/quote.routes';

const bootstrap = async () => {
  // Conectar a la base de datos
  await connectDB();
  await seedDB();

  // Crear el servidor Express
  const app = createServer();

  // Configurar rutas
  const quoteRepo = new MongoQuoteRepository();
  const quoteRoutes = createQuoteRoutes(quoteRepo);
  app.use('/api/quote', quoteRoutes);

  // Mensaje adicional para Swagger
  console.log('Swagger docs available at /api-docs');

  // Iniciar el servidor
  startServer(app);
};

bootstrap().catch((error) => {
  console.error('Bootstrap error:', error);
  process.exit(1);
});
