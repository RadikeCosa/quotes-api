import { Router, Request, Response } from 'express';
import { QuoteController } from '../controllers/quote.controller';
import { QuoteRepository } from '../../interfaces/quote.repository';

export const createQuoteRoutes = (quoteRepository: QuoteRepository) => {
  const router = Router();
  const controller = new QuoteController(quoteRepository);

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
  router.get('/random', async (req: Request, res: Response) => {
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
  router.get('/all', async (req: Request, res: Response) => {
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
  router.post('/', async (req: Request, res: Response) => {
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
  router.put('/:id', async (req: Request, res: Response) => {
    await controller.updateQuote(req, res);
  });

  return router;
};
