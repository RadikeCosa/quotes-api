"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateQuoteUseCase = void 0;
const quote_1 = require("../../domain/quote");
class CreateQuoteUseCase {
    constructor(quoteRepository) {
        this.quoteRepository = quoteRepository;
    }
    async execute(text, author) {
        const quote = quote_1.Quote.create(text, author);
        return this.quoteRepository.save(quote);
    }
}
exports.CreateQuoteUseCase = CreateQuoteUseCase;
