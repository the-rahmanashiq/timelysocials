export type IMeta = {
  page: number;
  limit: number;
  total: number;
};

export type ResponseSuccessType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  meta?: IMeta;
};

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages?: IGenericErrorMessage[];
};

export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};
