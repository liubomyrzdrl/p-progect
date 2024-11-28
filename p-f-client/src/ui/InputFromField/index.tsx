import React from "react";
import { Control, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";

interface IInputFromField {
  name: string;
  placeholder: string;
  control: Control<any>;
  error: any;
}

const InputFromField = ({
  name,
  placeholder,
  control,
  error,
}: IInputFromField) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          variant="standard"
          placeholder={placeholder}
          {...field}
          error={!!error}
          helperText={error?.message}
        />
      )}
    />
  );
};

export default InputFromField;
