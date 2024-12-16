"use client";

import React from "react";

import { Button } from "@/components/ui/Button";
import { useForm } from "react-hook-form";
import Link from "next/link";
import InputFromField from "@/components/ui/Form/InputFormField";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthLoginMutation } from "@/api/auth";
import { showTost } from "@/utils/toast";
import { ToastEnum } from "@/constants/enums";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { setAuthStateAction } from "@/store/features/authSlice";
import { setUserAction } from "@/store/features/userSlice";
import { useIsAuthProtectRoute } from "@/app/hooks/useIsAuthProtectRoute";
import FormContainer from "@/components/ui/Form/FormContainer";

const ariaLabel = { "aria-label": "description" };

interface IFormLogin {
  email: string;
  password: string;
}

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
      if (response.data) {
        showTost(ToastEnum.SUCCESS, "Login successful");

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
            `Login error - ${(errorData as { message: string }).message}`
          );
        } else {
          showTost(ToastEnum.ERROR, "Login error - Unknown error");
        }
      }
    } catch (error) {
      console.log("handleSubmit error", error);
      showTost(ToastEnum.ERROR, `Login error -${error} `);
      console.error(error);
    }
  };

  return (
    <div className="w-[400px] border-solid border-1 border-slate-400  shadow-lg bg-white p-10 text-center">
      <div className="text-dimgrey text-[28px] ">Login</div>
      <FormContainer form={form} onSubmit={handleSubmit}>
        <div className="h-[60px]">
          <InputFromField name="email" form={form} placeholder="Email" />
        </div>
        <div className="h-[60px]">
          <InputFromField name="password" form={form} placeholder="Password" />
        </div>
        <Button type="submit" className="mt-4 text-white">
          Login
        </Button>
      </FormContainer>
      <div className="mt-[30px] text-dimgrey">
        Do you have an account?{" "}
        <span className="text-blue-500 ">
          <Link href={"/auth/register"}> Register</Link>
        </span>
      </div>
    </div>
  );
};

export default Login;
