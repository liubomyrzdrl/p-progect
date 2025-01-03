import { FastifyInstance } from "fastify";
import AuthController from "../controllers/auth.controller";
import {
  authOpts,
  authOptsRegister,
  authOptsLogin,
  authGoogleOptsRegister,
  authGoogleOptsLogin,
} from "../interfaces/auth/auth.opts";

const router = async (fastify: FastifyInstance) => {
  /**
   * @route GET /api/auth test
   */
  fastify.get("/", authOpts, AuthController.authTest);

  /**
   * @route POST /api/auth/register
   */
  fastify.post(
    "/register",
    authOptsRegister,
    AuthController.authRegister as any
  );

  /**
   * @route POST /api/auth/google-register
   */
  fastify.post(
    "/google-register",
    authGoogleOptsRegister,
    AuthController.authGoogleRegister as any
  );

  /**
   * @route POST /api/auth/login
   */
  fastify.post("/login", authGoogleOptsLogin, AuthController.authLogin as any);
  /**
   * @route POST /api/auth/login
   */
  fastify.post(
    "/google-login",
    authGoogleOptsLogin,
    AuthController.authGoogleLogin as any
  );
};

export default router;
