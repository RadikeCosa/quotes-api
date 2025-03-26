import { QuoteModel, IQuote } from './models/quote.model';

const initialQuotes: IQuote[] = [
  { text: 'El esfuerzo de hoy es el éxito de mañana.', author: 'Anónimo' },
  { text: 'Cada paso te acerca a tu meta.', author: 'Confucio' },
  {
    text: 'La disciplina vence al talento cuando el talento no se disciplina.',
    author: 'Tim Notke',
  },
  { text: 'No pares hasta estar orgulloso.', author: 'Anónimo' },
  { text: 'Tu único límite es tu mente.', author: 'Napoleón Hill' },
];

export const seedDB = async (): Promise<void> => {
  try {
    const count = await QuoteModel.countDocuments();
    if (count === 0) {
      await QuoteModel.insertMany(initialQuotes);
      console.log('Database seeded with initial quotes');
    } else {
      console.log('Database already has data, skipping seed');
    }
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};
