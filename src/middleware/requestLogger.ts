import type { NextFunction, Request, Response } from 'express';
import { logger } from '../config/logger';

export const requestLogger = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const startTime = process.hrtime();

    res.on('finish', () => {
      const [seconds, nanoseconds] = process.hrtime(startTime);
      const responseTime = (seconds * 1000 + nanoseconds / 1e6).toFixed(2);
      const logData = {
        method: req.method,
        url: req.url,
        statusCode: res.statusCode,
        responseTime,
        userAgent: req.get('User-Agent'),
        ip: req.ip,
        correlationId: req.get('x-correlation-id'),
      };
      if (res.statusCode >= 400) {
        logger.error(logData, 'Request failed');
      } else {
        logger.info(logData, 'Request completed');
      }
    });

    next();
  };
};
