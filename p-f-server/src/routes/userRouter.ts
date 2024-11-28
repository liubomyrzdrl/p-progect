import { FastifyInstance } from "fastify";
import UserController from "../controllers/user.controller";
import { getUserOpts } from "../interfaces/users/user.opts";

const router = async (fastify: FastifyInstance) => {
  fastify.addHook('preHandler', fastify.authenticate);
  /**
   * @route GET /api/user
   */
  fastify.get("/:id", getUserOpts, UserController.getUser as any);
};

export default router;
