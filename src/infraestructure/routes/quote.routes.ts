import { Router, Request, Response } from 'express';
import { QuoteController } from '../controllers/quote.controller';
import { QuoteRepository } from '../../interfaces/quote.repository';

export const createQuoteRoutes = (quoteRepository: QuoteRepository) => {
  const router = Router();
  const controller = new QuoteController(quoteRepository);

  router.get('/random', async (req: Request, res: Response) => {
    await controller.getRandomQuote(req, res);
  });

  router.get('/all', async (req: Request, res: Response) => {
    await controller.getAllQuotes(req, res);
  });

  router.post('/', async (req: Request, res: Response) => {
    await controller.createQuote(req, res);
  });

  router.put('/:id', async (req: Request, res: Response) => {
    await controller.updateQuote(req, res);
  });

  return router;
};
