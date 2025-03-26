import { Quote } from '../../domain/quote';
import { QuoteRepository } from '../../interfaces/quote.repository';

export class GetAllQuotesUseCase {
  constructor(private quoteRepository: QuoteRepository) {}

  async execute(): Promise<Quote[]> {
    return this.quoteRepository.findAll();
  }
}
