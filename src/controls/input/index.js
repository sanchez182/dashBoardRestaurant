import { Controller } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import { verifyData } from '../inputsVerify';
import "./index.css";


function FormInput(props) { 
  const { name, label,control, errorobj, rules } = props;
  const  {isError , errorMessage} = verifyData(errorobj,name)
  return (  
    <Controller
    name={name}
    control={control}
    defaultValue="" 
    render={({ field: { onChange, value }}) => (
      <TextField
        fullWidth={true}
        label={label}
        variant="filled"
        value={value}
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
