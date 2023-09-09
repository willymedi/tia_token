export class UserNotExistError extends Error {
    constructor(username: string) {
      super(`${username} usuario no existe`);
      this.name = 'UserNotExistError';
    }
  }