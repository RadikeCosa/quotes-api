"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteQuoteUseCase = void 0;
class DeleteQuoteUseCase {
    constructor(quoteRepository) {
        this.quoteRepository = quoteRepository;
    }
    async execute(id) {
        return await this.quoteRepository.delete(id);
    }
}
exports.DeleteQuoteUseCase = DeleteQuoteUseCase;
