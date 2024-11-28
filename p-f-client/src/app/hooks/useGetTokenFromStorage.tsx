import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useGetUserQuery } from "@/api/user";
import { setAuthStateAction } from "@/store/features/authSlice";
import { decodeToken } from "@/utils/decodeToken";
import { setUserAction } from "@/store/features/userSlice";

export const useGetTokenFromStorage = async () => {
    const [token, setToken] = useState<string | null>(null);

    const decodedToken = decodeToken(token);

    const { data } = useGetUserQuery(
      { id: decodedToken?.id.id },
      { skip: !token }
    );


   const dispatch = useDispatch();

    useEffect(() => {
      const storedToken = localStorage.getItem("token");
      if(!storedToken)  return;
      if(data) dispatch(setUserAction(data));

      dispatch(setAuthStateAction(true));
      setToken(storedToken);
    }, [data, dispatch]);
  
    return token;
  };