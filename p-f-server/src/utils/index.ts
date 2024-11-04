import { FastifyRequest, FastifyReply } from "fastify";

export const handelCORS = (req: FastifyRequest, res: FastifyReply) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST");
  res.header("Access-Control-Allow-Headers", "*");

  const isPreflight = /options/i.test(req.method);
  if (isPreflight) {
    return res.send();
  }
};
