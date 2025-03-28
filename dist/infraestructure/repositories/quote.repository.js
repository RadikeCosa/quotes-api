"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoQuoteRepository = void 0;
const quote_1 = require("../../domain/quote");
const quote_model_1 = require("../database/models/quote.model");
class MongoQuoteRepository {
    async findRandom() {
        const count = await quote_model_1.QuoteModel.countDocuments();
        if (count === 0)
            return null;
        const randomIndex = Math.floor(Math.random() * count);
        const quoteDoc = await quote_model_1.QuoteModel.findOne().skip(randomIndex).exec();
        if (!quoteDoc)
            return null;
        return new quote_1.Quote(quoteDoc.text, quoteDoc.author, quoteDoc._id.toString());
    }
    async findAll() {
        const quotesDocs = await quote_model_1.QuoteModel.find().exec();
        return quotesDocs.map((doc) => new quote_1.Quote(doc.text, doc.author, doc._id.toString()));
    }
    async save(quote) {
        const quoteDoc = new quote_model_1.QuoteModel({ text: quote.text, author: quote.author });
        const savedDoc = await quoteDoc.save();
        return new quote_1.Quote(savedDoc.text, savedDoc.author, savedDoc._id.toString());
    }
    async update(id, quote) {
        const updatedDoc = await quote_model_1.QuoteModel.findByIdAndUpdate(id, { text: quote.text, author: quote.author }, { new: true }).exec();
        if (!updatedDoc)
            return null;
        return new quote_1.Quote(updatedDoc.text, updatedDoc.author, updatedDoc._id.toString());
    }
}
exports.MongoQuoteRepository = MongoQuoteRepository;
