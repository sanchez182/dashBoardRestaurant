import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { useTranslation } from 'react-i18next';

export default function SwitchServices({setState,state}:any) {
  const { t } = useTranslation();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
};
//videos[target.value as keyof IVideoData]
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Services</FormLabel>
      <FormGroup>
        <FormControlLabel
          control={<Switch 
            color="primary" checked={state.express} onChange={handleChange} name="express" />}
          label="Express"
        />
        <FormControlLabel
          control={<Switch 
            color="primary" checked={state.inSite} onChange={handleChange} name="inSite" />}
          label={t("insite")}
        />
        <FormControlLabel
          control={<Switch 
            color="primary" checked={state.toCarry} onChange={handleChange} name="toCarry" />}
          label={t("toCarry")}
        />
      </FormGroup>
    </FormControl>
  );
}
