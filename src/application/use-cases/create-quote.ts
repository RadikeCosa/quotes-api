import { Quote } from '../../domain/quote';
import { QuoteRepository } from '../../interfaces/quote.repository';

export class CreateQuoteUseCase {
  constructor(private quoteRepository: QuoteRepository) {}

  async execute(text: string, author: string): Promise<Quote> {
    const quote = Quote.create(text, author);
    return this.quoteRepository.save(quote);
  }
}
