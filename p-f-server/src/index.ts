import Fastify, { FastifyInstance } from "fastify";
import fastifyEnv from "@fastify/env";
import multipart from "@fastify/multipart";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fjwt, { FastifyJWT } from "@fastify/jwt";
import { config } from "./config/config";
import router from "./routes";
import { swaggerOptions, swaggerUiOptions } from "./config/swaggerOptions";
import { userSchemas } from "./interfaces/auth/auth.shema";
import dotenv from "dotenv";

const fastify: FastifyInstance = Fastify({
  logger: true,
});

fastify.register(fastifySwagger, swaggerOptions);
fastify.register(fastifySwaggerUi, swaggerUiOptions);

fastify.addHook("preHandler", (req, res, done) => {
  const allowedPaths = ["/some", "/list", "/of", "/api", "/paths"];
  if (allowedPaths.includes(req.routerPath)) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST");
    res.header("Access-Control-Allow-Headers", "*");
  }

  const isPreflight = /options/i.test(req.method);
  if (isPreflight) {
    return res.send();
  }

  done();
});

fastify.register(multipart, { attachFieldsToBody: true });

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
