import type winston from "winston";

export type LoggerConfig = {
  levels?: winston.config.AbstractConfigSetLevels;
};
