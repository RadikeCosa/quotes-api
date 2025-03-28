"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateQuoteUseCase = void 0;
const quote_1 = require("../../domain/quote");
class UpdateQuoteUseCase {
    constructor(quoteRepository) {
        this.quoteRepository = quoteRepository;
    }
    async execute(id, text, author) {
        const quote = quote_1.Quote.create(text, author);
        return this.quoteRepository.update(id, quote);
    }
}
exports.UpdateQuoteUseCase = UpdateQuoteUseCase;
