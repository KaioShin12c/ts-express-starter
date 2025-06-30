import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express from "express";
import { StatusCodes } from "http-status-codes";
import { ServiceResponseSchema } from "../../utils/serviceResponse";
import { UserSchema } from "./userModel";

export const userRegistry = new OpenAPIRegistry();
export const userRouter = express.Router();

const USER_TAG = "User";

userRegistry.register("User", UserSchema);

userRegistry.registerPath({
  method: "get",
  path: "/api/users",
  tags: [USER_TAG],
  responses: {
    [StatusCodes.OK]: {
      description: "List of users",
      content: {
        "application/json": {
          schema: ServiceResponseSchema.success({
            dataSchema: UserSchema.array(),
            hasMetadata: true,
          }),
        },
      },
    },
    [StatusCodes.BAD_REQUEST]: {
      description: "Bad request",
      content: {
        "application/json": {
          schema: ServiceResponseSchema.error({
            message: "Bad request",
            statusCode: StatusCodes.BAD_REQUEST,
            error: "Bad request",
          }),
        },
      },
    },
  },
});

userRouter.get("/", (_req, res) => {
  res.status(StatusCodes.OK).send([]);
});
