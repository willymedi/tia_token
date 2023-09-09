export class UserExistError extends Error {
    constructor(username: string) {
      super(`El usuario ${username} ya existe`);
      this.name = 'UserExistError';
    }
  }