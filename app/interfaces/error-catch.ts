export interface IErrorCatch {
  statusCode: number;
  response: {
    _data: {
      message: string;
      error: boolean;
      statusCode: number;
      statusMessage?: string;
    };
  };
}
