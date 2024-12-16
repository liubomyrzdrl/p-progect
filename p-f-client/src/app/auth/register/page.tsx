"use client";
import React from "react";

import { useForm } from "react-hook-form";
import Link from "next/link";

import InputFromField from "@/components/ui/Form/InputFormField";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { showTost } from "@/utils/toast";
import { useAuthRegisterMutation } from "@/api/auth";
import { useDispatch } from "react-redux";
import { ToastEnum } from "@/constants/enums";
import { useRouter } from "next/navigation";
import { setAuthStateAction } from "@/store/features/authSlice";
import { setUserAction } from "@/store/features/userSlice"; 
import { useIsAuthProtectRoute } from "@/app/hooks/useIsAuthProtectRoute";
import { Button } from "@/components/ui/Button";
import FormContainer from "@/components/ui/Form/FormContainer";

interface IFormRegister {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
}

const registerSchema = z.object({
  username: z.string(),
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email(),
  password: z.string().min(6),
  confirm_password: z.string().min(6),
});

const REGISTER = "Register";
const Register = () => {
  const [registerUser] = useAuthRegisterMutation();
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
  const handleSubmit = async (data: IFormRegister) => {
    try {
      const response = await registerUser(data);

      if (response.data) {
        showTost(ToastEnum.SUCCESS, "Registration  successful");
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
      showTost(ToastEnum.ERROR, `Login error -${error} `);
      console.error(error);
    }
  };

  return (
    <div className="w-[400px] border-solid border-1 border-slate-400 shadow-lg bg-white p-10 text-center">
      <div className="text-dimgrey text-[28px]">{REGISTER}</div>
      <FormContainer form={form} onSubmit={handleSubmit}>
        <div className="h-[60px]">
          <InputFromField name="username" form={form} placeholder="Username" />
        </div>
        <div className="h-[60px]">
          <InputFromField name="email" form={form} placeholder="Email" />
        </div>
        <div className="h-[60px]">
          <InputFromField name="password" form={form} placeholder="Password" />
        </div>
        <div className="h-[60px]">
          <InputFromField name="confirm_password" form={form} placeholder="Confirm Password" />
        </div>
        <Button type="submit" className="mt-4 text-white">
          Register
        </Button>
      </FormContainer>
      <div className="mt-[30px] text-dimgrey">
        Already have an account?{" "}
        <span className="text-blue-500">
          {" "}
          <Link href={"/auth/login"}>Login</Link>
        </span>
      </div>
    </div>
  );
};

export default Register;
