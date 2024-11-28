import { z } from "zod";

import { buildJsonSchemas } from "fastify-zod";

const getUserRequestSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email(),
});

const getUserResponseSchema = z.object({
  user: z.object({
    id: z.string(),
    email: z.string(),
    username: z.string(),
  }),
});

export type UserResponseType = z.infer<typeof getUserResponseSchema>;

export const { schemas: userSchemas, $ref } = buildJsonSchemas(
  { getUserResponseSchema, getUserRequestSchema },
  { $id: "UserSchemas" }
);
