import z from "@/config/zod";

export const UserSchema = z
  .object({
    id: z.string().openapi({ example: "1212121" }),
    name: z.string().openapi({ example: "John Doe" }),
    age: z.number().openapi({ example: 42 }),
  })
  .openapi("User");
