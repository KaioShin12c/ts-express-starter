import type { Logger } from "winston";

declare module "express-serve-static-core" {
  interface Request {
    log: Logger;
  }
}
