import { Controller } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import { verifyData } from '../inputsVerify';
import "./index.css";

function FormInput(props) { 
  const { name, label,control, errorobj,type, defaultValue,rules,startAdornment} = props;
  const  {isError , errorMessage} = verifyData(errorobj,name, props.tranlation)
 
  return (  
    <Controller
    name={name}
    control={control}
    defaultValue="" 
    render={({ field: { onChange, value }}) => (
      <TextField
      type={type}
      InputProps={{
        startAdornment
      }}
        fullWidth={true}
        label={label}
        variant="filled"
        value={ value ? value : defaultValue}
        onChange={onChange}
        error={isError}
        helperText={errorMessage}
      />
    )}
    rules={rules}
  />  
  );
}

export default FormInput;
