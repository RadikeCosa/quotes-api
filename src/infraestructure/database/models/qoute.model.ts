import { Schema, model } from 'mongoose';

export interface IQuote {
  text: string;
  author: string;
}

const quoteSchema = new Schema<IQuote>({
  text: { type: String, required: true },
  author: { type: String, required: true },
});

export const QuoteModel = model<IQuote>('Quote', quoteSchema);
