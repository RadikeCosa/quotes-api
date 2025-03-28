"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuoteController = void 0;
const get_random_quote_1 = require("../../application/use-cases/get-random-quote");
const get_all_quotes_1 = require("../../application/use-cases/get-all-quotes");
const create_quote_1 = require("../../application/use-cases/create-quote");
const update_quote_1 = require("../../application/use-cases/update-quote");
class QuoteController {
    constructor(quoteRepository) {
        this.quoteRepository = quoteRepository;
        this.getRandomQuote = async (_req, res) => {
            try {
                const useCase = new get_random_quote_1.GetRandomQuoteUseCase(this.quoteRepository);
                const quote = await useCase.execute();
                if (!quote) {
                    return res.status(404).json({ message: 'No quotes found' });
                }
                res.json(quote);
            }
            catch (error) {
                res.status(500).json({ message: 'Internal server error' });
            }
        };
        this.getAllQuotes = async (_req, res) => {
            try {
                const useCase = new get_all_quotes_1.GetAllQuotesUseCase(this.quoteRepository);
                const quotes = await useCase.execute();
                res.json(quotes);
            }
            catch (error) {
                res.status(500).json({ message: 'Internal server error' });
            }
        };
        this.createQuote = async (req, res) => {
            try {
                const { text, author } = req.body;
                if (!text || !author) {
                    return res
                        .status(400)
                        .json({ message: 'Text and author are required' });
                }
                const useCase = new create_quote_1.CreateQuoteUseCase(this.quoteRepository);
                const newQuote = await useCase.execute(text, author);
                res.status(201).json(newQuote);
            }
            catch (error) {
                res.status(500).json({ message: 'Internal server error' });
            }
        };
        this.updateQuote = async (req, res) => {
            try {
                const { id } = req.params;
                const { text, author } = req.body;
                if (!text || !author) {
                    return res
                        .status(400)
                        .json({ message: 'Text and author are required' });
                }
                const useCase = new update_quote_1.UpdateQuoteUseCase(this.quoteRepository);
                const updatedQuote = await useCase.execute(id, text, author);
                if (!updatedQuote) {
                    return res.status(404).json({ message: 'Quote not found' });
                }
                res.json(updatedQuote);
            }
            catch (error) {
                res.status(500).json({ message: 'Internal server error' });
            }
        };
    }
}
exports.QuoteController = QuoteController;
