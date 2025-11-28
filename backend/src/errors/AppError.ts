export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;

  constructor(message: string, statusCode = 500, code = 'INTERNAL_ERROR') {
    super(message);

    // Maintain correct prototype chain
    Object.setPrototypeOf(this, new.target.prototype);

    this.name = this.constructor.name; // “AppError”
    this.statusCode = statusCode;
    this.code = code;

    // Capture stack trace, omitting constructor frame
    Error.captureStackTrace(this, this.constructor);
  }
}
