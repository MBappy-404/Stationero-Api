 
 

import mongoose from 'mongoose';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';

const handleValidationError = (
  err: mongoose.Error.ValidationError
): TGenericErrorResponse => {
  // Combine all validation error messages into a single string.
  const details = Object.values(err.errors)
    .map((val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => val?.message)
    .join(', ');

  const error: TErrorSources = {
    details, // Concatenated error messages
  };

  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation Error',
    error,
  };
};

export default handleValidationError;

 