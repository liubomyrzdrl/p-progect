import Fastify, { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import fastifyEnv from "@fastify/env";
import multipart from "@fastify/multipart";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fjwt from "@fastify/jwt";

import router from "./routes";

import dotenv from "dotenv";
import { authenticateDecorator, registerCORS } from "./utils";
import { authSchemas } from "./interfaces/auth/auth.schema";
import { userSchemas } from "./interfaces/users/user.schema";
// import cookie, { FastifyCookieOptions } from '@fastify/cookie';

export const fastify: FastifyInstance = Fastify({
  logger: true,
});

fastify.register(fjwt, {
  secret: "supersecret"
});

// fastify.register(fastifySwagger, swaggerOptions);
// fastify.register(fastifySwaggerUi, swaggerUiOptions);

// fastify.register(cookie, {
//   secret: "my-secret", // for cookies signature
//   parseOptions: {}     // options for parsing cookies
// } as FastifyCookieOptions)

// fastify.addHook("preHandler", (req, res, done) => {
//     // console.log('preHandler',req);
//    handelCORS(req,res);
//    done();
// });

registerCORS(fastify);
authenticateDecorator(fastify);

fastify.register(multipart, { attachFieldsToBody: true })

const schema = {
  type: "object",
  required: ["PORT"],
  properties: {
    PORT: {
      type: "number",
      default: 8000,
    },
  },
};

const options = {
  confKey: "config",
  dotenv: true,
  schema,
  data: process.env,
};

dotenv.config();

for (let schema of [...userSchemas, ...authSchemas]) {
  fastify.addSchema(schema);
}

fastify.register(router, { prefix: "/api" });

(async () => {
  try {
    fastify.register(fastifyEnv, options);
    await fastify.ready();

    await fastify.listen({ port: Number(process.env.PORT), host: "0.0.0.0" });
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
})();
