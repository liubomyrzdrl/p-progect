import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetUserQuery } from "@/api/user";
import { setAuthStateAction } from "@/store/features/authSlice";
import { decodeToken } from "@/utils/decodeToken";
import { setUserAction } from "@/store/features/userSlice";
import { RootStoreType } from "@/store/store";
import { IUser } from "@/types/user";

export const useGetTokenFromStorage = () => {
  const [token, setToken] = useState<string | null>(null);
  const user = useSelector<RootStoreType, IUser | null>(
    (store) => store.userReducer.user
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);

      if (storedToken && !user?.id) {
        const decoded = decodeToken(storedToken);
        dispatch(setAuthStateAction(true));
        dispatch(setUserAction(decoded?.id));
      }
    };

    fetchToken();
  }, [dispatch, user?.id]);
};
