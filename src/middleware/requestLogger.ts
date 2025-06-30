import { randomUUID } from "node:crypto";
import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { env } from "../config/envConfig";
import logger from "../config/logger";

const addRequestId = (req: Request, res: Response, next: NextFunction) => {
  const existingId = req.headers["x-request-id"] as string;
  const requestId = existingId || randomUUID();

  req.headers["x-request-id"] = requestId;

  res.setHeader("x-request-id", requestId);

  next();
};

const httpLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = performance.now();

  req.log = logger.child({ request_id: req.headers["x-request-id"] });

  req.log.info(`incoming request ${req.method} ${req.url}`, {
    method: req.method,
    url: req.url,
    ip: req.ip,
    user_agent: req.headers["user-agent"],
  });

  res.on("finish", () => {
    const { statusCode } = res;

    const logData = {
      duration_ms: performance.now() - start,
      status_code: statusCode,
    };

    if (statusCode >= StatusCodes.INTERNAL_SERVER_ERROR) {
      req.log.error(`server error ${req.method} ${req.url}`, logData);
    } else if (statusCode >= StatusCodes.BAD_REQUEST) {
      req.log.warn(`client error ${req.method} ${req.url}`, logData);
    } else {
      req.log.info(`request completed ${req.method} ${req.url}`, logData);
    }
  });

  next();
};

const captureResponseBody = (_req: Request, res: Response, next: NextFunction) => {
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
