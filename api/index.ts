import { connectDB } from '../src/infraestructure/database/db';
import { seedDB } from '../src/infraestructure/database/seed';
import { MongoQuoteRepository } from '../src/infraestructure/repositories/quote.repository';
import { createServer } from '../src/infraestructure/server'; // Quitamos startServer de aquí
import { createQuoteRoutes } from '../src/infraestructure/routes/quote.routes';

// Variable para almacenar la instancia del servidor
let app: any;

const bootstrap = async () => {
  if (!app) {
    await connectDB();
    await seedDB();

    const server = createServer(); // Crea el servidor con Swagger ya configurado
    const quoteRepo = new MongoQuoteRepository();
    const quoteRoutes = createQuoteRoutes(quoteRepo);
    server.use('/api/quote', quoteRoutes);

    app = server; // Guarda la instancia del servidor
  }
  return app;
};

// Exportación para Vercel
export default async (req: any, res: any) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  const server = await bootstrap();
  return server(req, res); // Vercel usa este handler para todas las rutas
};

// Para desarrollo local
if (require.main === module) {
  bootstrap()
    .then((server) => {
      const PORT = process.env.PORT || 3000;
      server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        console.log(
          `Swagger Docs available at http://localhost:${PORT}/api-docs`
        );
      });
    })
    .catch((error) => {
      console.error('Bootstrap error:', error);
      process.exit(1);
    });
}
