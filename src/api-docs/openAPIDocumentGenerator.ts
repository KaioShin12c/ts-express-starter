import { OpenAPIRegistry, OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";

import { userRegistry } from "@/features/user/userRouter";

export type OpenAPIDocument = ReturnType<OpenApiGeneratorV3["generateDocument"]>;

export const generateOpenApiDocument = (): OpenAPIDocument => {
  const registry = new OpenAPIRegistry([userRegistry]);
  const generator = new OpenApiGeneratorV3(registry.definitions);

  return generator.generateDocument({
    openapi: "3.1.0",
    info: {
      title: "TS Express Starter",
      version: "1.0.0",
    },
    servers: [{ url: "http://localhost:3000" }],
  });
};
