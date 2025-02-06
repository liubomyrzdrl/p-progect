"use client";

import React from "react";

import { Button } from "@/components/ui/Button";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthGoogleLoginMutation, useAuthLoginMutation } from "@/api/auth";
import { showTost } from "@/utils/toast";
import { Auth, ToastEnum } from "@/constants/enums";
import { useDispatch } from "react-redux";
import { useGoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { useIsAuthProtectRoute } from "@/app/hooks/useIsAuthProtectRoute";
import FormContainer from "@/components/ui/Form/FormContainer";

import AuthInputFormField from "../components/AuthInputFormField";
import { getGoogleAccountInfo, setAuthDataToState } from "../utils";
import ContinueWithGoogleButton from "../components/ContinueWithGoogleButton";
import OrDelimiter from "../components/OrDelimiter";

const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

type LoginSchemaType = z.infer<typeof loginSchema>;
const Login = () => {
  const [loginUser] = useAuthLoginMutation();
  const [googleLoginUser] = useAuthGoogleLoginMutation();
  const dispatch = useDispatch();
  const router = useRouter();
  useIsAuthProtectRoute();

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (data: LoginSchemaType) => {
    try {
      const response = await loginUser(data);

      setAuthDataToState(
        response,
        "Login success",
        "Login error",
        router,
        dispatch
      );
    } catch (error) {
      showTost(ToastEnum.ERROR, `Login error -${error} `);
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const userInfo = await getGoogleAccountInfo(response);

        console.log("userInfo", userInfo);
        const responseGoogleLogin = await googleLoginUser({
          email: userInfo.email,
        });

        console.log("responseGoogleLogin", responseGoogleLogin);
        setAuthDataToState(
          responseGoogleLogin,
          "Google Login successful",
          "Google Login error",
          router,
          dispatch
        );
      } catch (error) {
        showTost(ToastEnum.ERROR, `Login error -${error} `);
      }
    },
    onError: () => showTost(ToastEnum.ERROR, "Google login failed"),
  });

  return (
    <div className="w-[400px] border-solid border-1 border-slate-400 rounded-sm shadow-lg bg-white p-10 text-center">
      <div className="text-dimgrey text-[28px]">{Auth.LOGIN}</div>
      <FormContainer form={form} onSubmit={handleSubmit}>
        <AuthInputFormField name="email" form={form} placeholder="Email" />
        <AuthInputFormField
          name="password"
          form={form}
          placeholder={Auth.PASSWORD}
        />
        <Button type="submit" className="mt-2 text-white w-full">
          {Auth.LOGIN}
        </Button>
      </FormContainer>
      <div className="mt-[10px] text-dimgrey">
        Do you have an account?{" "}
        <span className="text-blue-500 ">
          <Link href={"/auth/signup"}> {Auth.SIGNUP}</Link>
        </span>
      </div>
      <OrDelimiter />
      <ContinueWithGoogleButton onHandleGoogle={handleGoogleLogin} />
    </div>
  );
};

export default Login;
