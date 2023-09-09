export class TokenInvalidError extends Error {
    constructor(token_value: string) {
      super(`Token: ${token_value} invalido.`);
      this.name = 'TokenInvalidError';
    }
  }