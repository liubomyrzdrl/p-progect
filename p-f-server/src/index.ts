import Fastify, { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import fastifyEnv from "@fastify/env";
import multipart from "@fastify/multipart";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fjwt from "@fastify/jwt";
import { config } from "./config/config";
import router from "./routes";
import { swaggerOptions, swaggerUiOptions } from "./config/swaggerOptions";
import { userSchemas } from "./interfaces/auth/auth.shema";
import dotenv from "dotenv";
import { handelCORS } from "./utils";
// import cookie, { FastifyCookieOptions } from '@fastify/cookie';
// import fastifyCors from '@fastify/cors';

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

fastify.addHook("preHandler", (req, res, done) => {
    // console.log('preHandler',req);
   handelCORS(req,res);
   done();
});

fastify.decorate(
  "authenticate",
  async function (req: FastifyRequest, reply: FastifyReply) {
    try {
      await req.jwtVerify();
    } catch (err) {
      return reply.send(err);
    }
  }
);

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

fastify.get("/", async (request, response) => {
  return `<h1>Server Fastify</h1>`;
});

for (let schema of [...userSchemas]) {
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
