"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = exports.createServer = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
dotenv_1.default.config();
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
                url: process.env.RENDER_EXTERNAL_URL || 'http://localhost:3000', // Usa la URL de Render en producción
            },
        ],
    },
    apis: ['./src/infraestructure/routes/*.js'], // Cambia esto según la ubicación de tus archivos de rutas
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(swaggerOptions);
const createServer = () => {
    const app = (0, express_1.default)();
    // Middleware
    app.use(express_1.default.json()); // Para parsear cuerpos JSON
    app.use((0, cors_1.default)({
        origin: (origin, callback) => {
            console.log('Origin recibido:', origin);
            if (!origin || origin === 'https://fitness-study-app.vercel.app') {
                // Permitir solicitudes sin origen (por ejemplo, desde Postman o Swagger UI)
                callback(null, true);
            }
            else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        methods: ['GET', 'POST', 'PUT'],
    }));
    // Swagger
    app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
    return app;
};
exports.createServer = createServer;
const startServer = (app) => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
    });
};
exports.startServer = startServer;
