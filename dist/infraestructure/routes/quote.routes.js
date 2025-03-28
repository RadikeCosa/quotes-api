"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createQuoteRoutes = void 0;
const express_1 = require("express");
const quote_controller_1 = require("../controllers/quote.controller");
const createQuoteRoutes = (quoteRepository) => {
    const router = (0, express_1.Router)();
    const controller = new quote_controller_1.QuoteController(quoteRepository);
    /**
     * @swagger
     * /api/quote/random:
     *   get:
     *     summary: Obtiene una cita aleatoria
     *     responses:
     *       200:
     *         description: Cita obtenida exitosamente
     *       500:
     *         description: Error interno del servidor
     */
    router.get('/random', async (req, res) => {
        await controller.getRandomQuote(req, res);
    });
    /**
     * @swagger
     * /api/quote/all:
     *   get:
     *     summary: Obtiene todas las citas
     *     responses:
     *       200:
     *         description: Lista de citas obtenida exitosamente
     *       500:
     *         description: Error interno del servidor
     */
    router.get('/all', async (req, res) => {
        await controller.getAllQuotes(req, res);
    });
    /**
     * @swagger
     * /api/quote:
     *   post:
     *     summary: Crea una nueva cita
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               text:
     *                 type: string
     *                 description: El texto de la cita
     *                 example: "La vida es bella"
     *     responses:
     *       201:
     *         description: Cita creada exitosamente
     *       400:
     *         description: Datos inválidos
     *       500:
     *         description: Error interno del servidor
     */
    router.post('/', async (req, res) => {
        await controller.createQuote(req, res);
    });
    /**
     * @swagger
     * /api/quote/{id}:
     *   put:
     *     summary: Actualiza una cita existente
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID de la cita a actualizar
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               text:
     *                 type: string
     *                 description: El nuevo texto de la cita
     *                 example: "El éxito es la suma de pequeños esfuerzos repetidos día tras día"
     *     responses:
     *       200:
     *         description: Cita actualizada exitosamente
     *       400:
     *         description: Datos inválidos
     *       404:
     *         description: Cita no encontrada
     *       500:
     *         description: Error interno del servidor
     */
    router.put('/:id', async (req, res) => {
        await controller.updateQuote(req, res);
    });
    return router;
};
exports.createQuoteRoutes = createQuoteRoutes;
