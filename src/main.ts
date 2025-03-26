import { connectDB } from '../src/infraestructure/database/db';
import { seedDB } from '../src/infraestructure/database/seed';
import { MongoQuoteRepository } from '../src/infraestructure/quote.repository';
import { GetRandomQuoteUseCase } from './application/use-cases/get-random-quote';
import { GetAllQuotesUseCase } from './application/use-cases/get-all-quotes';
import { CreateQuoteUseCase } from './application/use-cases/create-quote';
import { UpdateQuoteUseCase } from './application/use-cases/update-quote';
import { Quote } from './domain/quote';

const startServer = async () => {
  await connectDB();
  await seedDB();

  const quoteRepo = new MongoQuoteRepository();

  // Probar GetRandomQuoteUseCase
  const getRandomQuote = new GetRandomQuoteUseCase(quoteRepo);
  const randomQuote = await getRandomQuote.execute();
  console.log('Random Quote:', randomQuote);

  // Probar GetAllQuotesUseCase
  const getAllQuotes = new GetAllQuotesUseCase(quoteRepo);
  const allQuotes = await getAllQuotes.execute();
  console.log('All Quotes:', allQuotes);

  // Probar CreateQuoteUseCase
  const createQuote = new CreateQuoteUseCase(quoteRepo);
  const newQuote = await createQuote.execute('Nueva cita de prueba', 'Grok');
  console.log('New Quote:', newQuote);

  // Probar UpdateQuoteUseCase
  const updateQuote = new UpdateQuoteUseCase(quoteRepo);
  const firstQuoteId =
    allQuotes.length > 0 && allQuotes[0].id ? allQuotes[0].id : '';
  const updatedQuote = await updateQuote.execute(
    firstQuoteId, // Usamos el id de la primera cita, si existe
    'Cita actualizada',
    'Grok Modificado'
  );
  console.log('Updated Quote:', updatedQuote);

  console.log('Server setup complete');
};

startServer();
