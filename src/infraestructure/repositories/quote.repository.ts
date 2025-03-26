import { Quote } from '../domain/quote';
import { QuoteRepository } from '../interfaces/quote.repository';
import { QuoteModel, IQuote } from './database/models/qoute.model';

export class MongoQuoteRepository implements QuoteRepository {
  async findRandom(): Promise<Quote | null> {
    const count = await QuoteModel.countDocuments();
    if (count === 0) return null;

    const randomIndex = Math.floor(Math.random() * count);
    const quoteDoc = await QuoteModel.findOne().skip(randomIndex).exec();
    if (!quoteDoc) return null;

    return new Quote(quoteDoc.text, quoteDoc.author, quoteDoc._id.toString());
  }

  async findAll(): Promise<Quote[]> {
    const quotesDocs = await QuoteModel.find().exec();
    return quotesDocs.map(
      (doc) => new Quote(doc.text, doc.author, doc._id.toString())
    );
  }

  async save(quote: Quote): Promise<Quote> {
    const quoteDoc = new QuoteModel({ text: quote.text, author: quote.author });
    const savedDoc = await quoteDoc.save();
    return new Quote(savedDoc.text, savedDoc.author, savedDoc._id.toString());
  }

  async update(id: string, quote: Quote): Promise<Quote | null> {
    const updatedDoc = await QuoteModel.findByIdAndUpdate(
      id,
      { text: quote.text, author: quote.author },
      { new: true }
    ).exec();

    if (!updatedDoc) return null;
    return new Quote(
      updatedDoc.text,
      updatedDoc.author,
      updatedDoc._id.toString()
    );
  }
}
