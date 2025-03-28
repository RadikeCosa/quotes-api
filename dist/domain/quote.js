"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Quote = void 0;
class Quote {
    constructor(text, author, id // Opcional, para soportar IDs de la base de datos
    ) {
        this.text = text;
        this.author = author;
        this.id = id;
    }
    static create(text, author, id) {
        return new Quote(text, author, id);
    }
}
exports.Quote = Quote;
