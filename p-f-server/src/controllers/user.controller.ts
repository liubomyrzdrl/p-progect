import { FastifyReply, FastifyRequest } from "fastify";
import AuthService from "../services/authService";
import { IUser } from "../interfaces/auth/types.auth";

class UserController {
  /**
   * @description Get user by id
   * @param {FastifyRequest} req - fastify request
   * @param {FastifyReply} reply - fastify reply
   * @returns {Promise<void>} promise with user data
   */
  async getUser(
    req: FastifyRequest<{
      Params: { id: string };
    }>,
    reply: FastifyReply
  ) {
    const { id } = req.params;
    const user = await AuthService.getUserById(id);
    reply.code(200).send({
      user,
    });
  }
}

export default new UserController();
