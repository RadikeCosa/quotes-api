"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllQuotesUseCase = void 0;
class GetAllQuotesUseCase {
    constructor(quoteRepository) {
        this.quoteRepository = quoteRepository;
    }
    async execute() {
        return this.quoteRepository.findAll();
    }
}
exports.GetAllQuotesUseCase = GetAllQuotesUseCase;
