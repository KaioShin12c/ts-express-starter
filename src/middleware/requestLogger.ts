import pinoHttp from 'pino-http';
import type { NextFunction, Request, Response } from 'express';
import { randomUUID } from 'crypto';
import type { LevelWithSilent } from 'pino';

import { config } from '../config/logger';
import { env } from '../config/envConfig';
import { logger } from '../config/logger';
import { StatusCodes } from 'http-status-codes';

const getLogLevel = (status: StatusCodes): LevelWithSilent => {
  if (status >= StatusCodes.INTERNAL_SERVER_ERROR) return 'error';
  if (status >= StatusCodes.BAD_REQUEST) return 'warn';
  return 'info';
};

const addRequestId = (req: Request, res: Response, next: NextFunction) => {
  const existingId = req.headers['x-request-id'] as string;
  const requestId = existingId || randomUUID();

  req.headers['x-request-id'] = requestId;

  res.setHeader('x-request-id', requestId);

  next();
};

const httpLogger = pinoHttp({
  logger,
  genReqId: (req) => req.headers['x-request-id'] as string,
  customLogLevel: (req) => getLogLevel(req.statusCode as StatusCodes),
  customSuccessMessage: (req) => `${req.method} ${req.url} completed`,
  customErrorMessage: (_, res) => `Request failed with status code ${res.statusCode}`,
  serializers: {
    req: (req) => ({ method: req.method, url: req.url, id: req.id }),
  },
  ...config[env.NODE_ENV],
});

const captureResponseBody = (req: Request, res: Response, next: NextFunction) => {
  if (!env.isProduction) {
    const originalSend = res.send;
    res.send = function (body) {
      res.locals.responseBody = body;
      return originalSend.call(this, body);
    };
  }
  next();
};

export default [addRequestId, captureResponseBody, httpLogger];
