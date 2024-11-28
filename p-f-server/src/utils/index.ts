import fp from "fastify-plugin";
import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";

// export const handelCORS = (req: FastifyRequest, res: FastifyReply) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

//   // Check if the request is a preflight request
//   if (req.method === "OPTIONS") {
//     res.status(204); // No Content
//     return res.send();
//   }

//   const isPreflight = /options/i.test(req.method);
//   if (isPreflight) {
//     return res.send();
//   }
// };

// export default fp(handelCORS);

export function registerCORS(app: FastifyInstance) {
  app.addHook("onRequest", (req: FastifyRequest, res: FastifyReply, done) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

    if (req.method === "OPTIONS") {
      res.status(204).send(); // Handle preflight OPTIONS request
    } else {
      done();
    }
  });
} ;

export function authenticateDecorator( app: FastifyInstance ) {
  app.decorate(
    "authenticate",
    async function (req: FastifyRequest, reply: FastifyReply) {
      try { 
        const verifyToken = await req.jwtVerify();
        if (!verifyToken) {
          return reply.status(401).send({ message: 'Authentication required' })
        }
      } catch (err) {
        reply.status(401).send({ message: "Unauthorized" });
      }
    }
  );
};