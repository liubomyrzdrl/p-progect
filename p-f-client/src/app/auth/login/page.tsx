"use client";

import React from "react";

import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import Link from "next/link";
import InputFromField from "@/ui/InputFromField";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Form from "@/ui/Form";
import { useAuthLoginMutation } from "@/api/auth";
import { showTost } from "@/utils/toast";
import { ToastEnum } from "@/constants/enums";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { setAuthStateAction } from "@/store/features/authSlice";
import { setUserAction } from "@/store/features/userSlice";
import { useIsAuthProtectRoute } from "@/app/hooks/useIsAuthProtectRoute";
import { RootStoreType } from "@/store/store";

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

  const isAuth = useSelector<RootStoreType>(
    (store) => store.authReducer.isAuth
  );

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
      if (response.error && 'error' in response.error) {
        showTost(ToastEnum.ERROR, `Login error - ${response.error.error} `);
      }
    } catch (error) {
      showTost(ToastEnum.ERROR, `Login error -${error} `);
      console.error(error);
    }
  };

  return (
    <div className="w-[400px] border-solid border-1 border-slate-400  shadow-lg bg-white p-10 text-center">
      <div className="text-slate-600 text-[28px] ">Login</div>
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
        </div>

        <div className="mt-[30px] ">
          <Button type="submit" variant="contained">
            Login
          </Button>
        </div>
      </Form>

      <div className="mt-[30px]">
        Do you have an account?{" "}
        <span className="text-blue-500 ">
          <Link href={"/auth/register"}> Register</Link>
        </span>
      </div>
    </div>
  );
};

export default Login;
