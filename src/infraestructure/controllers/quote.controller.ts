import { Request, Response } from 'express';
import { GetRandomQuoteUseCase } from '../../application/use-cases/get-random-quote';
import { GetAllQuotesUseCase } from '../../application/use-cases/get-all-quotes';
import { CreateQuoteUseCase } from '../../application/use-cases/create-quote';
import { UpdateQuoteUseCase } from '../../application/use-cases/update-quote';
import { QuoteRepository } from '../../interfaces/quote.repository';

export class QuoteController {
  constructor(private quoteRepository: QuoteRepository) {}

  getRandomQuote = async (_req: Request, res: Response) => {
    try {
      const useCase = new GetRandomQuoteUseCase(this.quoteRepository);
      const quote = await useCase.execute();
      if (!quote) {
        return res.status(404).json({ message: 'No quotes found' });
      }
      res.json(quote);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  getAllQuotes = async (_req: Request, res: Response) => {
    try {
      const useCase = new GetAllQuotesUseCase(this.quoteRepository);
      const quotes = await useCase.execute();
      res.json(quotes);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  createQuote = async (req: Request, res: Response) => {
    try {
      const { text, author } = req.body;
      if (!text || !author) {
        return res
          .status(400)
          .json({ message: 'Text and author are required' });
      }
      const useCase = new CreateQuoteUseCase(this.quoteRepository);
      const newQuote = await useCase.execute(text, author);
      res.status(201).json(newQuote);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  updateQuote = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { text, author } = req.body;
      if (!text || !author) {
        return res
          .status(400)
          .json({ message: 'Text and author are required' });
      }
      const useCase = new UpdateQuoteUseCase(this.quoteRepository);
      const updatedQuote = await useCase.execute(id, text, author);
      if (!updatedQuote) {
        return res.status(404).json({ message: 'Quote not found' });
      }
      res.json(updatedQuote);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  };
}
