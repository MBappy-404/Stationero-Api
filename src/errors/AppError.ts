 
  

class AppError extends Error {
  public statusCode: number;
  public details?: string;

  constructor(
    statusCode: number = 500, // Default status code for server errors
    message: string = 'An unexpected error occurred', // Default message
    details: string = '', // Additional details about the error
    stack: string = '' // Optional stack trace
  ) {
    super(message);

    this.statusCode = statusCode;
    this.details = details;

    
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
 
}

export default AppError;
