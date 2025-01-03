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
import { useDispatch, useSelector } from "react-redux";
import { useGoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { setAuthStateAction } from "@/store/features/authSlice";
import { setUserAction } from "@/store/features/userSlice";
import { useIsAuthProtectRoute } from "@/app/hooks/useIsAuthProtectRoute";
import FormContainer from "@/components/ui/Form/FormContainer";
import AuthInputFormField from "../components/AuthInputFormField";
import Image from "next/image";
import { getGoogleAccountInfo, setAuthDataToState } from "../utils";

const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email(),
  password: z.string().min(6),
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

        const responseGoogleLogin = await googleLoginUser({
          email: userInfo.email,
        });

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
    <div className="w-[400px] border-solid border-1 border-slate-400  shadow-lg bg-white p-10 text-center">
      <div className="text-dimgrey text-[28px]">{Auth.LOGIN}</div>
      <FormContainer form={form} onSubmit={handleSubmit}>
        <AuthInputFormField name="email" form={form} placeholder="Email" />
        <AuthInputFormField
          name="password"
          form={form}
          placeholder={Auth.PASSWORD}
        />

        <div
          className="flex items-center border-solid border-[1px] border-slate-200 rounded-sm px-3 py-3 cursor-pointer"
          onClick={() => handleGoogleLogin()}
        >
          <Image src="/google_img.png" width={20} height={20} alt="google" />
          <span className="ml-2 text-dimgrey">Continue with Google</span>
        </div>
        <Button type="submit" className="mt-4 text-white">
          {Auth.LOGIN}
        </Button>
      </FormContainer>
      <div className="mt-[30px] text-dimgrey">
        Do you have an account?{" "}
        <span className="text-blue-500 ">
          <Link href={"/auth/register"}> {Auth.REGISTER}</Link>
        </span>
      </div>
    </div>
  );
};

export default Login;
