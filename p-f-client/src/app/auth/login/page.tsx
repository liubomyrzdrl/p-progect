"use client";

import React from "react";

import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import Link from "next/link";
import InputFromField from "@/app/ui/InputFromField";

const ariaLabel = { "aria-label": "description" };

interface IFormLogin {
  email: string;
  password: string;
}
const Login = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (data: IFormLogin) => console.log(data);

  return (
    <div className="w-[400px] border-solid border-1 border-slate-400 rounded-[15px] shadow-lg bg-white p-10 text-center">
      <div className="text-slate-600 text-[28px] ">Login</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col mt-7">
          <InputFromField name="email" placeholder="Email" control={control} />
          <div className="mt-[20px] grid">
            <InputFromField
              name="password"
              placeholder="Password"
              control={control}
            />
          </div>
        </div>

        <div className="mt-[30px] ">
          <Button type="submit" variant="contained">
            Login
          </Button>
        </div>
      </form>
      <div className="mt-[30px]">
        Do you have an account?{" "}
        <span className="text-blue-500 ">
          {" "}
          <Link href={"/auth/register"}> Register</Link>
        </span>
      </div>
    </div>
  );
};

export default Login;
