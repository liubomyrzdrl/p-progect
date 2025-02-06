import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthStateAction } from "@/store/features/authSlice";
import { decodeToken } from "@/utils/decodeToken";
import { setUserAction } from "@/store/features/userSlice";
import { RootStoreType } from "@/store/store";
import { IUser } from "@/types/user";

export const useGetTokenFromStorage = () => {
  const dispatch = useDispatch();
  const user = useSelector<RootStoreType, IUser | null>(
    (store) => store.userReducer.user
  );
  const [isTokenChecked, setIsTokenChecked] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedToken = localStorage.getItem("token");

    if (storedToken && !user?.id) {
      const decoded = decodeToken(storedToken);
      dispatch(setAuthStateAction(true));
      dispatch(setUserAction(decoded?.id));
    }

    setIsTokenChecked(true); 
  }, [dispatch, user?.id]);

  return isTokenChecked;
};
