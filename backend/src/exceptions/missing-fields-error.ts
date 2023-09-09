export class MissingFieldsError extends Error {
    constructor(fieldName: string) {
      super(`Falta el campo: ${fieldName}.`);
      this.name = 'MissingFieldsError';
    }
  }