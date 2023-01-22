import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";

export function useForm(
  initialFValues: any,
  validateOnChange = false,
  validate: any
) {
  const validationErrors: any = {};
  const [values, setValues] = useState(initialFValues);
  const [errors, setErrors] = useState(validationErrors);

  const handleInputChange = (e: {
    target: { name: string; value: unknown };
  }) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    if (validateOnChange) validate({ [name]: value });
  };

  const resetForm = () => {
    setValues(initialFValues);
    setErrors(validationErrors);
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(2),
    },
  },
}));

export function Form(props: any) {
  const classes = useStyles();
  const { children, ...other } = props;
  return (
    <form className={classes.root} autoComplete="off" {...other}>
      {children}
    </form>
  );
}
