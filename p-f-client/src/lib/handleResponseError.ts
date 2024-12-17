import { ToastEnum } from "@/constants/enums";
import { showTost } from "@/utils/toast";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

type ResponseType = {
    data: any;
    error?: undefined;
} | {
    data?: undefined;
    error: FetchBaseQueryError | SerializedError;
}

export const handleResponseError = (response: ResponseType, toastErrorMessage: string) => {
    if (response.error && "data" in response.error) {
        const errorData = response.error.data;
        if (
          errorData &&
          typeof errorData === "object" &&
          "message" in errorData
        ) {
          showTost(
            ToastEnum.ERROR,
            `${toastErrorMessage} - ${(errorData as { message: string }).message}`
          );
        } else {
          showTost(ToastEnum.ERROR, `${toastErrorMessage} - Unknown error`);
        }
      }
}