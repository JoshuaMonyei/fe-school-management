import React from "react";
import {
  FormControl,
  FormControlLabel,
  Checkbox as MuiCheckbox,
} from "@material-ui/core";

export default function Checkbox(props: {
  name: string;
  label: string;
  value: boolean | undefined;
  onChange: any;
}) {
  const { name, label, value, onChange } = props;

  const convertToDefEventPara = (name: string, value: boolean | undefined) => ({
    target: {
      name,
      value,
    },
  });

  return (
    <FormControl>
      <FormControlLabel
        control={
          <MuiCheckbox
            name={name}
            color="primary"
            checked={value}
            onChange={(e) =>
              onChange(convertToDefEventPara(name, e.target.checked))
            }
          />
        }
        label={label}
      />
    </FormControl>
  );
}
