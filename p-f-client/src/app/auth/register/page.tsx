"use client";
import React from "react";

import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import Link from "next/link";
import InputFromField from "@/app/ui/InputFromField";
import { z } from "zod"

interface IFormRegister {
  email: string;
  password: string;
  confirm_password: string;
}

const REGISTER = "Register";
const Register = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirm_password: "",
    },
  });
  const onSubmit = (data: IFormRegister) => console.log(data);
  return (
    <div className="w-[400px] border-solid border-1 border-slate-400 rounded-[15px] shadow-lg bg-white p-10 text-center">
      <div className="text-slate-600 text-[28px]">{REGISTER}</div>
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
          <div className="mt-[20px] grid">
            <InputFromField
              name="confirm_password"
              placeholder="Confirm Password"
              control={control}
            />
          </div>
        </div>

        <div className="mt-[30px] ">
          <Button type="submit" variant="contained">
            {REGISTER}
          </Button>
        </div>
      </form>
      <div className="mt-[30px]">
        Already have an account?{" "}
        <span className="text-blue-500 ">
          {" "}
          <Link href={"/auth/login"}>Login</Link>
        </span>
      </div>
    </div>
  );
};

export default Register;
