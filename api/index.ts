import { connectDB } from '../src/infraestructure/database/db';
import { seedDB } from '../src/infraestructure/database/seed';
import { MongoQuoteRepository } from '../src/infraestructure/repositories/quote.repository';
import { createServer, startServer } from '../src/infraestructure/server';
import { createQuoteRoutes } from '../src/infraestructure/routes/quote.routes';

let app: any; // Variable para almacenar la instancia del servidor

const bootstrap = async () => {
  if (!app) {
    await connectDB();
    await seedDB();

    const server = createServer();
    const quoteRepo = new MongoQuoteRepository();
    const quoteRoutes = createQuoteRoutes(quoteRepo);
    server.use('/api/quote', quoteRoutes);

    app = server; // Guarda la instancia del servidor
  }
  return app;
};

// Exportación para Vercel
export default async (req: any, res: any) => {
  const server = await bootstrap();
  return server(req, res);
};

// Para desarrollo local
if (require.main === module) {
  bootstrap()
    .then((server) => startServer(server))
    .catch((error) => {
      console.error('Bootstrap error:', error);
      process.exit(1);
    });
}
