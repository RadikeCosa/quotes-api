import { Quote } from '../../domain/quote';
import { QuoteRepository } from '../../interfaces/quote.repository';

export class UpdateQuoteUseCase {
  constructor(private quoteRepository: QuoteRepository) {}

  async execute(
    id: string,
    text: string,
    author: string
  ): Promise<Quote | null> {
    const quote = Quote.create(text, author);
    return this.quoteRepository.update(id, quote);
  }
}
