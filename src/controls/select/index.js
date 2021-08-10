import React from "react";
import { Controller } from "react-hook-form";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { StyledInputLabel } from "../../styles";
import FormHelperText from "@material-ui/core/FormHelperText";
import { verifyData } from "../inputsVerify";

function FormSelect(props) {
  const { label, name, options, required,rules, control, errorobj } = props;
  const  {isError , errorMessage} = verifyData(errorobj,name)
  return (
      <Controller
      control={control}
      name={name}
      label={label}
      defaultValue=""
        render={({ field: { onChange, value } }) => (
          <FormControl fullWidth={true} error={isError}>
            <StyledInputLabel htmlFor={name}>
              {label} {required ? <span className="req-label">*</span> : null}
            </StyledInputLabel>
            <Select  id={name} {...props} value={value} onChange={onChange}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {options.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{errorMessage}</FormHelperText>
          </FormControl>
        )}
        rules={rules}
      />
  );
}

export default React.memo(FormSelect);
