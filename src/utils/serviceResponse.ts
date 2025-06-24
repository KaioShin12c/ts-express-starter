import { StatusCodes } from "http-status-codes";
import z from "../config/zod";

const ResponseStatusEnum = z.enum(["success", "error"]);

const MetadataSchema = z.object({
	page: z.number().openapi({ example: 1 }),
	pageSize: z.number().openapi({ example: 10 }),
	total: z.number().openapi({ example: 100 }),
});

export type Metadata = z.infer<typeof MetadataSchema>;
export type ResponseError = string;
export type DataType<T> = T | null;

export class ServiceResponse<DataType = null> {
	readonly status: "success" | "failure";
	readonly message: string;
	readonly data: DataType;
	readonly statusCode: StatusCodes;
	readonly error?: ResponseError;
	readonly metadata?: Metadata;

	private constructor(
		status: "success" | "failure",
		message: string,
		data: DataType,
		statusCode: StatusCodes,
		error?: ResponseError,
		metadata?: Metadata,
	) {
		this.status = status;
		this.message = message;
		this.data = data;
		this.statusCode = statusCode;

		if (error) {
			this.error = error;
		}
		if (metadata) {
			this.metadata = metadata;
		}
	}

	static success<DataType>(
		message: string,
		data: DataType,
		statusCode: StatusCodes = StatusCodes.OK,
		metadata?: Metadata,
	) {
		return new ServiceResponse(
			"success",
			message,
			data,
			statusCode,
			undefined,
			metadata,
		);
	}

	static failure(
		message: string,
		statusCode: StatusCodes = StatusCodes.BAD_REQUEST,
		error: ResponseError,
	) {
		return new ServiceResponse(
			"failure",
			message,
			null,
			statusCode,
			error,
			undefined,
		);
	}
}

export const ServiceResponseSchema = {
	success({
		dataSchema,
		statusCode = StatusCodes.OK,
		message = "Success",
		hasMetadata = false,
	}: {
		dataSchema: z.ZodTypeAny;
		statusCode?: StatusCodes;
		message?: string;
		hasMetadata?: boolean;
	}) {
		const ResponseSchema = z.object({
			status: ResponseStatusEnum.openapi({ example: "success" }),
			statusCode: z.nativeEnum(StatusCodes).openapi({ example: statusCode }),
			message: z.string().openapi({ example: message }),
			data: dataSchema.nullish(),
		});

		if (!hasMetadata) return ResponseSchema;

		return z.object({ ...ResponseSchema.shape, metadata: MetadataSchema });
	},
	error({
		message = "Error",
		statusCode = StatusCodes.BAD_REQUEST,
		error = "Something went wrong",
	}: {
		message: string;
		statusCode?: StatusCodes;
		error: ResponseError;
	}) {
		const ResponseSchema = z.object({
			status: ResponseStatusEnum.openapi({ example: "error" }),
			statusCode: z.nativeEnum(StatusCodes).openapi({ example: statusCode }),
			message: z.string().openapi({ example: message }),
			error: z.string().openapi({ example: error }),
			data: z.null().openapi({ example: null }),
		});

		return ResponseSchema;
	},
};
