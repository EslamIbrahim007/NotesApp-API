export default class ApiError extends Error {
  constructor(statusCode, message, details = null) {
    super(message);
    this.statusCode = statusCode;
    this.details = details; // optional array of error messages or fields
    this.isOperational = true; // to distinguish known errors
    Error.captureStackTrace(this, this.constructor);
  }
}