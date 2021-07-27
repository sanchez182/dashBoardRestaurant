import { Controller } from "react-hook-form";
import { verifyData } from '../inputsVerify';
import "./index.css";
import { FormControl, FormControlLabel, Switch } from "@material-ui/core";

function FormSwitch(props) {
  const { name, label, control,defaultValue, errorobj, rules, } = props;
  const { isError, errorMessage } = verifyData(errorobj, name, props.tranlation)
  
  const isValue=(value)=>{
   
   return value
  }
  return (
    <Controller
      control={control}
      name={name}
      label={label}
      render={({ field: { onChange, value } }) => (

    <FormControl component="fieldset">
       <FormControlLabel
          control={<Switch
            error={isError}
            color="primary" checked={()=>isValue(value)} onChange={onChange} name={name} />}
          label={label}
        />
    </FormControl>
       

      )}
      rules={rules}
    />
  );
}

export default FormSwitch;