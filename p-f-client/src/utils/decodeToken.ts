import { jwtDecode } from "jwt-decode";

export const decodeToken = (token: string | null) => {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  try {
    return jwtDecode<{
      id: {
        id: string;
      };
    }>(token);
  } catch (error) {
    return null;
  }
};
