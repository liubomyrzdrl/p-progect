import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "./form";
import { Input } from "../Input";
import { UseFormReturn } from "react-hook-form";

type InputFormFieldType = {
  form: UseFormReturn<any>;
  name: string;
  placeholder: string;
  label?: string;
};
const InputFormField = ({ form, name, label="", placeholder= "" }: InputFormFieldType) => {
  const error = form.formState.errors[name];

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder } {...field} hasError={!!error} />
          </FormControl>
          {/* <FormDescription>This is your public display name.</FormDescription> */}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputFormField;
