import winston, { type Logger } from "winston";

import { env } from "@/config/envConfig";
import type { LoggerConfig } from "./types";
import { customizeFormat } from "./utils";

export default (config?: LoggerConfig): Logger => {
  return winston.createLogger({
    levels: config?.levels ?? winston.config.syslog.levels,
    level: env.LOG_LEVEL,

    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.label({ label: "dev" }),
      winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" })
    ),
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(customizeFormat),
      }),
    ],
  });
};
