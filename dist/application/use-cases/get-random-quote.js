"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetRandomQuoteUseCase = void 0;
class GetRandomQuoteUseCase {
    constructor(quoteRepository) {
        this.quoteRepository = quoteRepository;
    }
    async execute() {
        return this.quoteRepository.findRandom();
    }
}
exports.GetRandomQuoteUseCase = GetRandomQuoteUseCase;
