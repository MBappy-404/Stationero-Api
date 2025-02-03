export type TErrorSources = {
  details: string;
};

export type TGenericErrorResponse = {
  statusCode: number;
  message: string;
  error: TErrorSources;
};