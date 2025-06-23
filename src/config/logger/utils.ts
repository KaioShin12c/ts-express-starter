import winston from 'winston';

export const customizeFormat = winston.format.printf(({ level, message, timestamp, label }) => {
  return `${timestamp} ${label} [${level}]: ${message}`;
});
