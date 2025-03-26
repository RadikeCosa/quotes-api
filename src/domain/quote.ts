export class Quote {
  constructor(
    public text: string,
    public author: string,
    public id?: string // Opcional, para soportar IDs de la base de datos
  ) {}

  static create(text: string, author: string, id?: string): Quote {
    return new Quote(text, author, id);
  }
}
