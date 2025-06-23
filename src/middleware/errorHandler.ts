import type { ErrorRequestHandler, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

// Catch all unexpected requests
const unexpectedRequest = (_req: Request, res: Response) => {
  console.log('unexpectedRequest');
  res.status(StatusCodes.NOT_FOUND).send('Not Found');
};

// Add error to request log
const addErrorToRequestLog: ErrorRequestHandler = (err, _req, res, next) => {
  res.locals.err = err;
  next(err);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  const status =
    res.statusCode >= StatusCodes.BAD_REQUEST ? res.statusCode : StatusCodes.INTERNAL_SERVER_ERROR;

  req.log.error(err);

  res.status(status).json({
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
  });
};

export default [unexpectedRequest, addErrorToRequestLog, errorHandler];
