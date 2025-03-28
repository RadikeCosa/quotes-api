"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./infraestructure/database/db");
const seed_1 = require("./infraestructure/database/seed");
const quote_repository_1 = require("./infraestructure/repositories/quote.repository");
const server_1 = require("./infraestructure/server");
const quote_routes_1 = require("./infraestructure/routes/quote.routes");
const bootstrap = async () => {
    // Conectar a la base de datos
    await (0, db_1.connectDB)();
    await (0, seed_1.seedDB)();
    // Crear el servidor Express
    const app = (0, server_1.createServer)();
    // Configurar rutas
    const quoteRepo = new quote_repository_1.MongoQuoteRepository();
    const quoteRoutes = (0, quote_routes_1.createQuoteRoutes)(quoteRepo);
    app.use('/api/quote', quoteRoutes);
    // Mensaje adicional para Swagger
    console.log('Swagger docs available at /api-docs');
    // Iniciar el servidor
    (0, server_1.startServer)(app);
};
bootstrap().catch((error) => {
    console.error('Bootstrap error:', error);
    process.exit(1);
});
