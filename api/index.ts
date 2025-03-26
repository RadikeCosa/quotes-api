import { connectDB } from '../src/infraestructure/database/db';
import { seedDB } from '../src/infraestructure/database/seed';
import { MongoQuoteRepository } from '../src/infraestructure/repositories/quote.repository';
import { createServer, startServer } from '../src/infraestructure/server';
import { createQuoteRoutes } from '../src/infraestructure/routes/quote.routes';

const bootstrap = async () => {
  await connectDB();
  await seedDB();

  const app = createServer();
  const quoteRepo = new MongoQuoteRepository();
  const quoteRoutes = createQuoteRoutes(quoteRepo);
  app.use('/api/quote', quoteRoutes);

  return app;
};

export default async (req: any, res: any) => {
  const app = await bootstrap();
  return app(req, res);
};

// Para desarrollo local
if (require.main === module) {
  bootstrap()
    .then((app) => startServer(app))
    .catch((error) => {
      console.error('Bootstrap error:', error);
      process.exit(1);
    });
}
