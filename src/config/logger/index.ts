import type winston from "winston";

import { env } from "../envConfig";
import { logLevels } from "./constants";
import devLogger from "./logger.dev";
import prodLogger from "./logger.prod";

let logger: winston.Logger | null = null;

if (env.NODE_ENV === "production") {
  logger = prodLogger({ levels: logLevels });
}
if (env.NODE_ENV === "development") {
  logger = devLogger({ levels: logLevels });
}

export default logger as winston.Logger;
