import { FastifyReply, FastifyRequest } from "fastify";
import AuthService from "../services/authService";
import argon2 from "argon2";
import { ICreateUserInput } from "../interfaces/auth/types.auth";
import { LoginUserInput } from "../interfaces/auth/auth.shema";
import { fastify } from "../index";

class AuthController {
  async authTest(req: FastifyRequest, reply: FastifyReply) {
    const user = await AuthService.getTestUser();
    reply.code(200).send({
      data: {
        hello: `Auth ${user?.username} email: ${user?.email}`,
      },
      message: "Test Auth route",
    });
  }

  async authRegister(
    req: FastifyRequest<{
      Body: ICreateUserInput;
    }>,
    reply: FastifyReply
  ): Promise<void> {
    const { username, email, password } = req.body;
    const existedUser = await AuthService.getUserByEmail(email);

    if (existedUser) {
      return reply.code(401).send({
        message: "User already exists with this email",
      });
    }

    const hashedPassword = await argon2.hash(password);
    try {
      const newUser = await AuthService.createUser(
        username,
        email,
        hashedPassword
      );
      const token = fastify.jwt.sign({
        id: newUser.id,
        username,
      });

      reply.code(200).send({ user: newUser, token });
    } catch (err) {
      return reply.code(500).send(err);
    }
  }

  async authLogin(
    req: FastifyRequest<{
      Body: LoginUserInput;
    }>,
    reply: FastifyReply
  ) {
    console.log('Auth authLogin');
    const { email, password } = req.body;
    const existedUser = await AuthService.getUserByEmail(email);
    console.log("Login", existedUser);
    const token =
      existedUser?.username &&
      fastify.jwt.sign({
        id: existedUser,
        username: existedUser?.username,
      });
    const isValidPassword = await argon2.verify(
      existedUser?.password as string,
      password
    );


    if (!existedUser || !isValidPassword) {
      return reply.code(401).send({
        message: "Invalid email or password",
      });
    }

    reply.code(200).send({
      user: existedUser,
      token,
    });
  }
}

export default new AuthController();
