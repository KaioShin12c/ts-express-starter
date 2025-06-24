import winston, { type Logger } from 'winston';
import os from 'node:os';
import { resolve } from 'node:path';
import { mkdirSync, existsSync } from 'node:fs';

import 'winston-daily-rotate-file';

import { env } from '../envConfig';
import { LoggerConfig } from './types';
import { customizeFormat } from './utils';

// ensure log directory exists
const LOG_DIR = resolve(process.cwd(), 'logs');
if (!existsSync(LOG_DIR)) {
  mkdirSync(LOG_DIR, { recursive: true });
}

const commonConfigFile = {
  maxSize: '10m',
  dirname: LOG_DIR,
  datePattern: 'YYYY-MM-DD',
  maxFiles: '14d',
  zippedArchive: true,
};

const transportError = new winston.transports.DailyRotateFile({
  filename: 'error-%DATE%.log',
  level: 'error',

  ...commonConfigFile,
});
const transportConbine = new winston.transports.DailyRotateFile({
  filename: 'app-%DATE%.log',
  level: 'info',
  ...commonConfigFile,
});
const transportConsole = new winston.transports.Console({
  format: winston.format.combine(customizeFormat),
});

export default (config?: LoggerConfig): Logger => {
  return winston.createLogger({
    levels: config?.levels ?? winston.config.syslog.levels,
    level: env.LOG_LEVEL,
    defaultMeta: {
      service: 'ts-express-starter', // name of the service
      version: '1.0.0', // can get version from package.json
      pid: process.pid,
      hostname: os.hostname(),
    },
    format: winston.format.combine(
      winston.format.label({ label: 'prod' }),
      winston.format.errors({ stack: true }),
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      winston.format.json()
    ),
    transports: [transportError, transportConbine, transportConsole],
  });
};
