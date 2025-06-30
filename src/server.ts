import cors from "cors";
import express from "express";
import helmet from "helmet";

import { openAPIRouter } from "./api-docs/openAPIRouter";
import { userRouter } from "./features/user/userRouter";

import errorHandler from "./middleware/errorHandler";
import { rateLimiter } from "./middleware/rateLimiter";
import requestLogger from "./middleware/requestLogger";

const app = express();

// trust proxy
app.set("trust proxy", 1);
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(rateLimiter);
app.use(cors());
app.use(helmet());

// Logger
app.use(requestLogger);

// Routes
app.get("/", (req, res) => {
  req.log.info("Hello World!");
  res.send("Hello World!");
});

app.get("/error", () => {
  throw new Error("App crashed!");
});

app.use("/api", userRouter);

app.use(openAPIRouter);

// Error handlers
app.use(errorHandler);

export { app };
