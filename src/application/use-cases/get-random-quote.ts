import { Quote } from '../../domain/quote';
import { QuoteRepository } from '../../interfaces/quote.repository';

export class GetRandomQuoteUseCase {
  constructor(private quoteRepository: QuoteRepository) {}

  async execute(): Promise<Quote | null> {
    return this.quoteRepository.findRandom();
  }
}
