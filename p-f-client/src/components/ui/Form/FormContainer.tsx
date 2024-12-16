import React from "react";

import { FormProvider, UseFormReturn } from "react-hook-form";
import { Form } from "./form";

interface IForm {
    children: React.ReactNode;
    form: UseFormReturn<any>;
    onSubmit: (values: any) => void;
}
const FormContainer = ({ children, form, onSubmit }: IForm) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>{children}</form>
    </Form>
  );
};

export default FormContainer;