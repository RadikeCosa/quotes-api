import { QuoteRepository } from '../../interfaces/quote.repository';

export class DeleteQuoteUseCase {
  constructor(private quoteRepository: QuoteRepository) {}

  async execute(id: string): Promise<boolean> {
    return await this.quoteRepository.delete(id);
  }
}
