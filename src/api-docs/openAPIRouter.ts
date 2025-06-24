import express from "express";
import swaggerUi from "swagger-ui-express";

import { generateOpenApiDocument } from "./openAPIDocumentGenerator";

export const openAPIRouter = express.Router();
const openApiDocument = generateOpenApiDocument();

openAPIRouter.get("/openapi.json", (_req, res) => {
	res.setHeader("Content-Type", "application/json");
	res.json(openApiDocument);
});

openAPIRouter.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiDocument));
