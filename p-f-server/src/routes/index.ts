import { FastifyInstance } from "fastify";
import authRouter from "./authRouter";
import userRouter from "./userRouter";

const router = async (fastify: FastifyInstance) => {
    fastify.register(authRouter, { prefix: 'auth' });
    fastify.register(userRouter, { prefix: 'user' });
};

export default router;