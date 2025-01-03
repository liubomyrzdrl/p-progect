import { ToastEnum } from "@/constants/enums";
import { setAuthStateAction } from "@/store/features/authSlice";
import { setUserAction } from "@/store/features/userSlice";
import { showTost } from "@/utils/toast";
import { TokenResponse } from "@react-oauth/google";
import { Dispatch, SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const getGoogleAccountInfo = async (
  response: Omit<TokenResponse, "error" | "error_description" | "error_uri">
) => {
  const userInfoResponse = await fetch(
    "https://www.googleapis.com/oauth2/v3/userinfo",
    {
      headers: {
        Authorization: `Bearer ${response.access_token}`,
      },
    }
  );
  return await userInfoResponse.json();
};

type ResponseType = {
    data: any;
    error?: undefined;
} | {
    data?: undefined;
    error: FetchBaseQueryError | SerializedError;
};
export const setAuthDataToState = (
response: ResponseType,
  toastMessageSuccess: string,
  toastMessageError: string,
  router: AppRouterInstance,
  dispatch: Dispatch<
    | { payload: any; type: "authReducer/setAuthStateAction" }
    | { payload: any; type: "user/setUserAction" }
  >
) => {
  if (response.data) {
    showTost(ToastEnum.SUCCESS, toastMessageSuccess);
    
    dispatch(setAuthStateAction(true));
    dispatch(setUserAction(response.data.user));
    
    localStorage.setItem("token", JSON.stringify(response.data.token));
    router.push("/");
  }

  if (response.error && "data" in response.error) {
    const errorData = response.error.data;
    if (
      errorData &&
      typeof errorData === "object" &&
      "message" in errorData
    ) {
      showTost(
        ToastEnum.ERROR,
        `${toastMessageError} - ${(errorData as { message: string }).message}`
      );
    } else {
      showTost(ToastEnum.ERROR, `${toastMessageError} - Unknown error`);
    }
  }
};
