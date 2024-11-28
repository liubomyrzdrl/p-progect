import React from "react";

import { useForm, FormProvider, UseFormReturn } from "react-hook-form";

interface IForm {
    children: React.ReactNode;
    form: UseFormReturn<any>;
    onSubmit: (values: any) => void;
}
const Form = ({ children, form, onSubmit }: IForm) => {
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default Form;
