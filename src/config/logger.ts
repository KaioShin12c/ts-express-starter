import pino from 'pino-http';
import { Env, env } from './envConfig';
import { LoggerOptions } from 'pino';
import path from 'path';
import type { Request } from 'express';

// LOGS LEVEL AND THEIR USE CASES
// trace: 10 Detailed excution tracing
// debug: 20 Debugging information
// info: 30 General application logs
// warn: 40 Warnings that require attention
// error: 50 Application errors
// fatal: 60 Critical errors

const config: Record<Env, LoggerOptions> = {
  development: {
    transport: {
      target: 'pino-pretty',
      level: 'debug',
      options: {
        colorize: true,
        levelFirst: true,
        translateTime: 'SYS:standard',
      },
    },
  },
  production: {
    transport: {
      target: 'pino/file',
      level: 'info',
      options: {
        destination: path.join(__dirname, '../../../logs/app.log'),
        mkdir: true,
        sync: false,
      },
    },
    level: 'info',
    timestamp: () => `,"timestamp":"${new Date().toISOString()}"`,
  },
};

export const { logger } = pino(config[env.NODE_ENV]);

export const createRouteLogger = (req: Request) => {
  return logger.child({ method: req.method, url: req.url, query: req.query });
};
