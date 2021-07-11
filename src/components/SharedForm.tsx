import React, { useEffect, useState } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { useForm } from 'react-hook-form';
import FormInput from '../controls/input';
import FormSelect from '../controls/select';
import { COMPONENTSTYPE } from './EnumsComponents';
import { Theme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import CurrencyComponent from './CurrencyComponent';
import LoadingButton from './LoadingButton';
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';

type State = { a: string }; // your state type
type AppDispatch = ThunkDispatch<State, any, AnyAction>;
// or restrict to specific actions instead of AnyAction

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
  actionSubmit: any;
  inputs: any[],
  haveMoneyInputs: boolean
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


const SharedForm = ({ actionSubmit, inputs, haveMoneyInputs }: ISharedForm) => {
  const classes = useStyles();
  const [state, setstate] = useState<any>(null)
  const [currency, setCurrency] = React.useState('$');
  const { loadingRequest } = useSelector((state: RootState) => state.requestReducer);
  const dispatch: AppDispatch = useDispatch();

  const setFormData = (data: any) => {
    const model = {
      itemdDescription: data.productName,
      quantityPortion: data.quantityPortions,
      registerDate: Date.now()
    }
    dispatch(actionSubmit(model)).then(() => {
      debugger
      inputs.forEach(element => {
        reset({ [element.name]: "" });
      });
    })
  }

  const { t: tranlation } = useTranslation();
  const { handleSubmit, reset, control, formState: { errors } } = useForm();
  useEffect(() => {
    inputs.forEach(element => {
      element["Component"] = setComponent(element.componentName)
    });
    setstate(inputs)
  }, [inputs])

  return (

    <form className={classes.root} style={{ width: "100%" }} onSubmit={handleSubmit(setFormData)}>
      <Grid container spacing={1}>
        {haveMoneyInputs &&
          <Grid item xs={12} md={6} >
            <CurrencyComponent setCurrency={setCurrency} currency={currency} currencyLabel={tranlation("labels.stockForm.currencyLabel")} />
          </Grid>}
        {state && state.map((element: any) => {
          return (<Grid item xs={12} md={6} key={element.name}>
            <element.Component control={control}
              name={element.name}
              key={element.name}
              options={element.options}
              label={tranlation(element.label)}
              rules={element.rules}
              required={true}
              adorn={element.currency && currency}
              type={element.type}
              tranlation={tranlation}
              errorobj={errors} />
          </Grid>)
        })}
        <Grid item xs={12} md={12} >
          {/*         <Button type="submit" style={{float: 'right'}} variant="contained" color="primary">
          Guardar datos
        </Button> */}
          <LoadingButton
            isLoading={loadingRequest}
            textButton="Guardar datos"
            type="submit"
            classButton=""
            handleSubmit={() => { }}
            icon=""
          />

        </Grid>
      </Grid>
    </form>
  );
};

export default React.memo(SharedForm)