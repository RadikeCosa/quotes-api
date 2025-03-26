import { Quote } from '../domain/quote';

export interface QuoteRepository {
  findRandom(): Promise<Quote | null>;
  findAll(): Promise<Quote[]>;
  save(quote: Quote): Promise<Quote>;
  update(id: string, quote: Quote): Promise<Quote | null>;
}
