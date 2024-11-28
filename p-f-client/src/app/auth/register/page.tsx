"use client";
import React from "react";

import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import Link from "next/link";
import InputFromField from "@/ui/InputFromField";
import { z } from "zod";
import Form from "@/ui/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import { showTost } from "@/utils/toast";
import { useAuthRegisterMutation } from "@/api/auth";
import { useDispatch } from "react-redux";
import { ToastEnum } from "@/constants/enums";
import { useRouter } from "next/navigation";
import { setAuthStateAction } from "@/store/features/authSlice";
import { setUserAction } from "@/store/features/userSlice"; 
import { useIsAuthProtectRoute } from "@/app/hooks/useIsAuthProtectRoute";

interface IFormRegister {
  email: string;
  password: string;
  confirm_password: string;
}

const registerSchema = z.object({
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
      if (response.error && 'error' in response.error) {
        showTost(ToastEnum.ERROR, `Login error - ${response.error.error} `);
      }
    } catch (error) {
      showTost(ToastEnum.ERROR, `Login error -${error} `);
      console.error(error);
    }
  };

  return (
    <div className="w-[400px] border-solid border-1 border-slate-400 shadow-lg bg-white p-10 text-center">
      <div className="text-slate-600 text-[28px]">{REGISTER}</div>
      <Form form={form} onSubmit={handleSubmit}>
        <div className="flex flex-col mt-7">
          <InputFromField
            name="email"
            placeholder="Email"
            control={form.control}
            error={form.formState.errors.email}
          />
          <div className="mt-[20px] grid">
            <InputFromField
              name="password"
              placeholder="Password"
              control={form.control}
              error={form.formState.errors.password}
            />
          </div>
          <div className="mt-[20px] grid">
            <InputFromField
              name="confirm_password"
              placeholder="Confirm Password"
              control={form.control}
              error={form.formState.errors.confirm_password}
            />
          </div>
        </div>

        <div className="mt-[30px] ">
          <Button type="submit" variant="contained">
            {REGISTER}
          </Button>
        </div>
      </Form>
      <div className="mt-[30px]">
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
