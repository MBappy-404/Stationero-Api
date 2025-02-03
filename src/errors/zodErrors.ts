 

import { ZodError, ZodIssue } from 'zod';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';

const handleZodError = (err: ZodError): TGenericErrorResponse => {
  // Combine all Zod issue messages into a single string
  const details = err.issues
    .map((issue: ZodIssue) => `${issue.path.join('.')} - ${issue.message}`)
    .join(', ');

  const error: TErrorSources = {
    details, // Single concatenated error message
  };

  const statusCode = 400;

  return {
    statusCode,
    message: 'Zod validation Error',
    error,
  };
};

export default handleZodError;
