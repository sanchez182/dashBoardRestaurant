import { Controller } from "react-hook-form";
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import { verifyData } from '../inputsVerify';


function CheckboxInput(props) { 
  const { name, label,control, errorobj,} = props;
  const  {isError , errorMessage} = verifyData(errorobj,name, props.tranlation)


  return (  
    <Controller
    name={name}
    control={control}
    defaultValue="" 
    render={({ field: { onChange, value }}) => (
      <FormControl component="fieldset" >
      <FormLabel component="legend">Assign responsibility</FormLabel>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox checked={value} onChange={onChange} name="gilad" />}
          label="Gilad Gray"
        />
        <FormControlLabel
          control={<Checkbox checked={value} onChange={onChange} name="jason" />}
          label="Jason Killian"
        />
        <FormControlLabel
          control={<Checkbox checked={value} onChange={onChange} name="antoine" />}
          label="Antoine Llorca"
        />
      </FormGroup>
      <FormHelperText>Be careful</FormHelperText>
    </FormControl>
     /*  <TextField
      type={type}
      InputProps={{
        startAdornment
      }}
        fullWidth={true}
        label={label}
        variant="filled"
        value={value}
        onChange={onChange}
        error={isError}
        helperText={errorMessage}
      /> */
    )}
  />  
  );
}

export default CheckboxInput;
