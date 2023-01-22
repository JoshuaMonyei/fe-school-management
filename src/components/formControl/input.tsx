import React from "react";
import { TextField } from "@material-ui/core";

export default function Input(props: {
  name?: string;
  label: string;
  value?: string;
  error?: null | any;
  onChange?: any;
}) {
  const { name, label, value, error = null, onChange } = props;
  return (
    <TextField
      variant="outlined"
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      {...(error && { error: true, helperText: error })}
    />
  );
}
