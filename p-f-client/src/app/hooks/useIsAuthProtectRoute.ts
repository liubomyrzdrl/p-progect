import { useEffect } from "react";
import { redirect } from "next/navigation";

export const useIsAuthProtectRoute = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isAuthToken = localStorage.getItem("token");
      if (isAuthToken) {
        redirect("/");
      }
    }
  }, []);
};
