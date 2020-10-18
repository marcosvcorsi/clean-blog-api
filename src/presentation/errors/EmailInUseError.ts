export class EmailInUseError extends Error {
  constructor() {
    super('Email already registered');
    this.name = 'EmailInUseError';
  }
}
