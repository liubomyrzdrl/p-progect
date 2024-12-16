import { DB } from "../config/dbConfig";
import { IUser } from "../interfaces/auth/types.auth";

class AuthService {
  async createUser(username: string, email: string, password: string) {
    try {
      const user = await DB.user.create({
        data: { username, email, password },
      });
      return user;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async getTestUser() {
    try {
      const user = await DB.user.findFirst();

      return user;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async getUserByEmail(email: string): Promise<IUser | null> {
    try {
      const user = await DB.user.findUnique({
        where: {
          email,
        },
      });
      return user;
    } catch (err: any) {
      throw new Error("User not found");
    }
  }
  async getUserById(id: string): Promise<IUser | null> {
    try {
      const user = await DB.user.findUnique({
        where: {
          id,
        },
      });

      return user;
    } catch (err: any) {
      console.log("Login error", err);
      throw new Error("User nt found");
    }
  }
}

export default new AuthService();
