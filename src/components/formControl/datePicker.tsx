import React from "react";
import TextField from '@mui/material/TextField';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "date-fns";

export default function DatePicker(props: {
  name: string;
  label: string;
  value: any;
  onChange: any;
}) {
  const { name, label, value, onChange } = props;

  const convertToDefEventPara = (name: string, value: any) => ({
    target: {
      name,
      value,
    },
  });

  return (
    // <MuiPickersUtilsProvider utils={DateFnsUtils}>
    //   <KeyboardDatePicker
    //     disableToolbar
    //     variant="inline"
    //     inputVariant="outlined"
    //     label={label}
    //     format="MMM/dd/yyyy"
    //     name={name}
    //     value={value}
    //     onChange={(date) => onChange(convertToDefEventPara(name, date))}
    //   />
    // </MuiPickersUtilsProvider>
    <TextField
    id="date"
    label={label}
    type="date"
    defaultValue={value}
    sx={{ width: 220 }}
    InputLabelProps={{
      shrink: true,
    }}
  />
  );
}
