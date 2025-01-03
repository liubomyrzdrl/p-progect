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

import Image from "next/image";
import { getGoogleAccountInfo, setAuthDataToState } from "../utils";

const registerSchema = z.object({
  username: z.string({ required_error: "User Name is required" }),
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email(),
  password: z.string().min(6),
  confirm_password: z.string().min(6),
});

type RegisterSchemaType = z.infer<typeof registerSchema>;

const Register = () => {
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
      showTost(ToastEnum.ERROR, `Register error -${error} `);
      console.error(error);
    }
  };

  const handleGoogleLogin = useGoogleLogin({
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
    <div className="w-[400px] border-solid border-1 border-slate-400 shadow-lg bg-white p-10 text-center">
      <div className="text-dimgrey text-[28px]">{Auth.REGISTER}</div>
      <FormContainer form={form} onSubmit={handleSubmit}>
        <AuthInputFormField name="username" form={form} placeholder="User Name" />
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
        <div
          className="flex items-center border-solid border-[1px] border-slate-200 rounded-sm px-3 py-3 cursor-pointer"
          onClick={() => handleGoogleLogin()}
        >
          <Image src="/google_img.png" width={20} height={20} alt="google" />
          <span className="ml-2 text-dimgrey">Continue with Google</span>
        </div>
        <Button type="submit" className="mt-4 text-white">
          {Auth.REGISTER}
        </Button>
      </FormContainer>
      <div className="mt-[30px] text-dimgrey">
        Already have an account?{" "}
        <span className="text-blue-500">
          {" "}
          <Link href={"/auth/login"}>{Auth.LOGIN}</Link>
        </span>
      </div>
    </div>
  );
};

export default Register;
