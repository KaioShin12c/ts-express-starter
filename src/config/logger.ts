import path from 'path';
import pino, { LoggerOptions } from 'pino';

import { env, Env } from './envConfig';

export const config: Record<Env, LoggerOptions> = {
  development: {
    transport: {
      target: 'pino-pretty',
      level: 'debug',
      options: { colorize: true, levelFirst: true, translateTime: 'SYS:standard' },
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

export const logger = pino(config[env.NODE_ENV]);
