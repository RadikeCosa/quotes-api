"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuoteModel = void 0;
const mongoose_1 = require("mongoose");
const quoteSchema = new mongoose_1.Schema({
    text: { type: String, required: true },
    author: { type: String, required: true },
});
exports.QuoteModel = (0, mongoose_1.model)('Quote', quoteSchema);
