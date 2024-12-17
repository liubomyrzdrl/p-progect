"use client";
import React from "react";

import { useForm } from "react-hook-form";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { showTost } from "@/utils/toast";
import { useAuthRegisterMutation } from "@/api/auth";
import { useDispatch } from "react-redux";
import { Auth, ToastEnum } from "@/constants/enums";
import { useRouter } from "next/navigation";
import { setAuthStateAction } from "@/store/features/authSlice";
import { setUserAction } from "@/store/features/userSlice";
import { useIsAuthProtectRoute } from "@/app/hooks/useIsAuthProtectRoute";
import { Button } from "@/components/ui/Button";
import FormContainer from "@/components/ui/Form/FormContainer";
import AuthInputFormField from "../components/AuthInputFormField";
import { handleResponseError } from "@/lib/handleResponseError";

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

type RegisterSchemaType = z.infer<typeof registerSchema>;

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
  const handleSubmit = async (data: RegisterSchemaType) => {
    try {
      const response = await registerUser(data);

      if (response.data) {
        showTost(ToastEnum.SUCCESS, "Registration  successful");
        dispatch(setAuthStateAction(true));
        dispatch(setUserAction(response.data.user));

        localStorage.setItem("token", JSON.stringify(response.data.token));
        router.push("/");
      }
      handleResponseError(response, "Register error");
    } catch (error) {
      showTost(ToastEnum.ERROR, `Register error -${error} `);
      console.error(error);
    }
  };

  return (
    <div className="w-[400px] border-solid border-1 border-slate-400 shadow-lg bg-white p-10 text-center">
      <div className="text-dimgrey text-[28px]">{Auth.REGISTER}</div>
      <FormContainer form={form} onSubmit={handleSubmit}>
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
