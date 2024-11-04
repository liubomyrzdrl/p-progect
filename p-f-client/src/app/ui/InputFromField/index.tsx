import React from "react";
import { Control, Controller } from "react-hook-form";
import Input from "@mui/material/Input";

interface IInputFromField {
  name: string;
  placeholder: string;
  control: Control<any>;
}

const InputFromField = ({ name, placeholder, control }: IInputFromField) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => <Input placeholder={placeholder} {...field} />}
    />
  );
};

export default InputFromField;
