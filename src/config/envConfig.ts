import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const Envs = ["development", "production"] as const;
const EnvEnum = z.enum(Envs);
export type Env = z.infer<typeof EnvEnum>;

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  NODE_ENV: EnvEnum.default("development"),
  HOST: z.string().default("localhost"),
  LOG_LEVEL: z.enum(["trace", "debug", "info", "warn", "error", "fatal"]).default("info"),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("Invalid environment variables", parsedEnv.error.format());
  throw new Error("Invalid environment variables");
}

export const env = {
  ...parsedEnv.data,
  isDevelopment: parsedEnv.data.NODE_ENV === "development",
  isProduction: parsedEnv.data.NODE_ENV === "production",
};
