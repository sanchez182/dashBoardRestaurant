import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import TextField from "@material-ui/core/TextField";
import { useTranslation } from 'react-i18next';

export default function SwitchSchedule({ setSchedule, state }: any) {
  const { t } = useTranslation();

  const handleChange =(event: React.ChangeEvent<HTMLInputElement>)=>{
    setSchedule({ ...state,[event.target.name]: event.target.checked });
  }
  
  const onChange =(event: React.ChangeEvent<HTMLInputElement>)=>{
    setSchedule({ ...state, [event.target.name]: event.target.value });
  }

  const renderDays =(name:string)=>{
     return ( 
       
    <Grid item xs={12} md={6} > <FormControlLabel
      control={<Switch 
        color="primary"  checked={state[name]} onChange={handleChange} name={name} />}
      label={t(`days.${name}`) }
    />
    <TextField
    name={name+"Text"}
    disabled={!state[name]}
      type={"text"}
      variant="filled"
      value={state[name+"Text"]}
      onChange={onChange}
  /> </Grid>)
  }

  return (
    <Grid container spacing={1} >
      {renderDays("monday")}
      {renderDays("tuesday")}
      {renderDays("wednesday")}
      {renderDays("tursday")}
      {renderDays("friday")}
      {renderDays("saturday")}
      {renderDays("sunday")}
      
    </Grid>
  );
}
