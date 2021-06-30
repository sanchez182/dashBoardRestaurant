import React, { useEffect, useState } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { useForm } from 'react-hook-form';
import FormInput from '../controls/input';
import FormSelect from '../controls/select';
import { COMPONENTSTYPE } from './EnumsComponents';
import { Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    justifyContent: 'center',
    alignItems: 'center',

    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: "100%",
    },
    '& .MuiButtonBase-root': {
      margin: theme.spacing(2),
    },
  },
}));

interface ISharedForm {
  onSubmit: (data: any) => void;
  inputs: any[]
}


const setComponent = (componentName: String) => {
  let renderComponent;
  switch (componentName) {
    case COMPONENTSTYPE.input:
      renderComponent = FormInput;
      break;
    case COMPONENTSTYPE.select:
      renderComponent = FormSelect;
      break;
    default:
      renderComponent = FormInput;
      break;
  }
  return renderComponent
}


const SharedForm = ({ onSubmit, inputs }: ISharedForm) => {
  const classes = useStyles();
  const [state, setstate] = useState<any>(null)
  const { handleSubmit, control, formState: { errors } } = useForm();

  useEffect(() => {
    inputs.forEach(element => {
      element["Component"] = setComponent(element.componentName)
    });
    setstate(inputs)
  }, [inputs])

  return (

    <form className={classes.root} style={{width:"100%"}} onSubmit={handleSubmit(onSubmit)}>
    <Grid container spacing={1}>
      {state && state.map((element: any) => {
        return (<Grid item xs={12} md={6} key={element.name}>
          <element.Component control={control}
            name={element.name}
            key={element.name}
            options={element.options}
            label={element.label}
            rules={element.rules}
            required={true}
            errorobj={errors} />
        </Grid>)
      })}
      <Grid item xs={12} md={12} >
        <Button type="submit" style={{float: 'right'}} variant="contained" color="primary">
          Guardar datos
        </Button>
        </Grid>
        </Grid>
    </form>
  );
};

export default React.memo(SharedForm)