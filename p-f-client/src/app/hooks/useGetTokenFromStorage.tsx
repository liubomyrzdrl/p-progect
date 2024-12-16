import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useGetUserQuery } from "@/api/user";
import { setAuthStateAction } from "@/store/features/authSlice";
import { decodeToken } from "@/utils/decodeToken";
import { setUserAction } from "@/store/features/userSlice";

export const useGetTokenFromStorage = () => {
  const [token, setToken] = useState<string | null>(null);


  const dispatch = useDispatch();

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);

      if (storedToken) {
        const decoded = decodeToken(storedToken);
        dispatch(setAuthStateAction(true));
        dispatch(setUserAction(decoded?.id));
      }
    };

    fetchToken();
  }, [ dispatch]);
};