import React from "react";

import InputFromField from "@/components/ui/Form/InputFormField";
import { UseFormReturn } from "react-hook-form";
type AuthInputFormField = {
  name: string;
  form:  UseFormReturn<any>;
  placeholder: string;
};

const AuthInputFormField = ({
  name,
  form,
  placeholder,
}: AuthInputFormField) => {
  return (
    <div className="h-[60px]">
      <InputFromField name={name} form={form} placeholder={placeholder} />
    </div>
  );
};

export default AuthInputFormField;
