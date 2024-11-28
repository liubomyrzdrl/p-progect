import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";


const createUserSchema = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string().min(6),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;

const createUserResponseSchema = z.object({
  user: z.object({
    id: z.string(),
    email: z.string(),
    username: z.string(),
  }),
  token: z.string(),
});

const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email(),
  password: z.string().min(6),
});

export type LoginUserInput = z.infer<typeof loginSchema>;

const loginResponseSchema = z.object({
  user: z.object({
    id: z.string(),
    email: z.string(),
    username: z.string(),
  }),
  token: z.string(),
});

export const { schemas: authSchemas, $ref } = buildJsonSchemas({
  createUserSchema,
  createUserResponseSchema,
  loginSchema,
  loginResponseSchema,
},   { $id: "AuthSchemas" } );