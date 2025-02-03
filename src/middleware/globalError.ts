

import { ZodError } from 'zod';
import AppError from '../errors/AppError';
import { TErrorSources } from '../interface/error';
import { ErrorRequestHandler } from 'express';
import handleValidationError from '../errors/validationError';
import handleZodError from '../errors/zodErrors';

const globalErrorHandler: ErrorRequestHandler = (err, req, res,next) => {
  // Set default error values
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong';
  let error: TErrorSources = {
    details: 'Something went wrong',
  };

  // Handle specific error types
  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    error = simplifiedError.error;
  } else if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    error = simplifiedError.error;
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    error = {
      details: err.details || "An unexpected error occurred",
    };
  } else if (err instanceof Error) {
    message = err.message;
    error = {
      details: err.message,
    };
  }

  // Send error response
  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
    error: error,
    stack: err?.stack,
  });
};

export default globalErrorHandler;


 