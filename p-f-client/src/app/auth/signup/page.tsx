"use client";
import React from "react";

import { useForm } from "react-hook-form";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { showTost } from "@/utils/toast";
import {
  useAuthGoogleRegisterMutation,
  useAuthRegisterMutation,
} from "@/api/auth";
import { useDispatch } from "react-redux";
import { Auth, ToastEnum } from "@/constants/enums";
import { useRouter } from "next/navigation";
import { useGoogleLogin } from "@react-oauth/google";
import { useIsAuthProtectRoute } from "@/app/hooks/useIsAuthProtectRoute";
import { Button } from "@/components/ui/Button";
import FormContainer from "@/components/ui/Form/FormContainer";

import AuthInputFormField from "../components/AuthInputFormField";
import { getGoogleAccountInfo, setAuthDataToState } from "../utils";
import ContinueWithGoogleButton from "../components/ContinueWithGoogleButton";
import OrDelimiter from "../components/OrDelimiter";

const registerSchema = z
  .object({
    username: z
      .string({ required_error: "User Name is required" })
      .min(6, { message: "User Name must be at least 6 characters" }),
    email: z
      .string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
      })
      .email(),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirm_password: z
      .string()
      .min(6, { message: "Confirm Password must be at least 6 characters" }),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ["confirm_password"],
    message: "Passwords do not match",
  });

type RegisterSchemaType = z.infer<typeof registerSchema>;

const SignUp = () => {
  const [registerUser] = useAuthRegisterMutation();
  const [googleRegisterUser] = useAuthGoogleRegisterMutation();

  const dispatch = useDispatch();
  const router = useRouter();
  useIsAuthProtectRoute();

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  const handleSubmit = async (data: RegisterSchemaType) => {
    try {
      const response = await registerUser(data);

      setAuthDataToState(
        response,
        "Registration success",
        "Registration error",
        router,
        dispatch
      );
    } catch (error) {
      showTost(ToastEnum.ERROR, `Register error - ${error} `);
      console.error(error);
    }
  };

  const handleGoogleRegister = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const userInfo = await getGoogleAccountInfo(response);

        const responseGoogleRegister = await googleRegisterUser({
          email: userInfo.email,
          username: userInfo.name,
        });
        setAuthDataToState(
          responseGoogleRegister,
          "Google Registration successful",
          "Google Registration error",
          router,
          dispatch
        );
      } catch (error) {
        console.error("Google Login Error:", error);
        alert("Failed to login");
      }
    },
    onError: () => alert("Google login failed"),
  });

  return (
    <div className="w-[400px] border-solid border-1 rounded-sm border-slate-400 shadow-lg bg-white p-10 text-center">
      <div className="text-dimgrey text-[28px]">{Auth.SIGNUP}</div>
      <FormContainer form={form} onSubmit={handleSubmit}>
        <AuthInputFormField
          name="username"
          form={form}
          placeholder="User Name"
        />
        <AuthInputFormField name="email" form={form} placeholder="Email" />
        <AuthInputFormField
          name="password"
          form={form}
          placeholder={Auth.PASSWORD}
        />
        <AuthInputFormField
          name="confirm_password"
          form={form}
          placeholder={Auth.CONFIRM_PASSWORD}
        />

        <Button type="submit" className="mt-2 text-white w-full">
          {Auth.SIGNUP}
        </Button>
      </FormContainer>
      <div className="mt-[10px] text-dimgrey">
        Already have an account?{" "}
        <span className="text-blue-500">
          {" "}
          <Link href={"/auth/login"}>{Auth.LOGIN}</Link>
        </span>
      </div>
      <OrDelimiter />
      <ContinueWithGoogleButton onHandleGoogle={handleGoogleRegister} />
    </div>
  );
};

export default SignUp;