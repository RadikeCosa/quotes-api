import { Router, Request, Response } from 'express';
import { QuoteController } from '../controllers/quote.controller';
import { QuoteRepository } from '../../interfaces/quote.repository';

/**
 * @swagger
 * tags:
 *   name: Quotes
 *   description: API for managing quotes
 */
export const createQuoteRoutes = (quoteRepository: QuoteRepository) => {
  const router = Router();
  const controller = new QuoteController(quoteRepository);

  /**
   * @swagger
   * /quotes/random:
   *   get:
   *     summary: Get a random quote
   *     tags: [Quotes]
   *     responses:
   *       200:
   *         description: A random quote
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: string
   *                 text:
   *                   type: string
   *                 author:
   *                   type: string
   */
  router.get('/random', async (req: Request, res: Response) => {
    await controller.getRandomQuote(req, res);
  });

  /**
   * @swagger
   * /quotes/all:
   *   get:
   *     summary: Get all quotes
   *     tags: [Quotes]
   *     responses:
   *       200:
   *         description: A list of quotes
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   id:
   *                     type: string
   *                   text:
   *                     type: string
   *                   author:
   *                     type: string
   */
  router.get('/all', async (req: Request, res: Response) => {
    await controller.getAllQuotes(req, res);
  });

  /**
   * @swagger
   * /quotes:
   *   post:
   *     summary: Create a new quote
   *     tags: [Quotes]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               text:
   *                 type: string
   *               author:
   *                 type: string
   *     responses:
   *       201:
   *         description: Quote created successfully
   */
  router.post('/', async (req: Request, res: Response) => {
    await controller.createQuote(req, res);
  });

  /**
   * @swagger
   * /quotes/{id}:
   *   put:
   *     summary: Update an existing quote
   *     tags: [Quotes]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: The ID of the quote to update
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               text:
   *                 type: string
   *               author:
   *                 type: string
   *     responses:
   *       200:
   *         description: Quote updated successfully
   */
  router.put('/:id', async (req: Request, res: Response) => {
    await controller.updateQuote(req, res);
  });

  /**
   * @swagger
   * /quotes/{id}:
   *   delete:
   *     summary: Delete a quote
   *     tags: [Quotes]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: The ID of the quote to delete
   *     responses:
   *       200:
   *         description: Quote deleted successfully
   */
  router.delete('/:id', async (req: Request, res: Response) => {
    await controller.deleteQuote(req, res);
  });

  return router;
};
