import React, { useEffect, useState } from 'react';
import {  Grid } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import FormInput from '../controls/input';
import FormInputItems from '../controls/inputAddItems';
import FormSelect from '../controls/select';
import { COMPONENTSTYPE } from './EnumsComponents';
import { useTranslation } from 'react-i18next';
import CurrencyComponent from './CurrencyComponent';
import LoadingButton from './LoadingButton';
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import CheckboxInput from '../controls/checkbox';

type State = { a: string }; // your state type
type AppDispatch = ThunkDispatch<State, any, AnyAction>;
// or restrict to specific actions instead of AnyAction

/* const useStyles = makeStyles((theme: Theme) => ({
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
})); */

interface ISharedForm {
  actionSubmit: any;
  inputs: any[],
  createModel?: any;
  haveMoneyInputs: boolean,
  childElement?: any
}


const setComponent = (componentName: String) => {
  let renderComponent;
  switch (componentName) {
    case COMPONENTSTYPE.inputAddItems:
      renderComponent = FormInputItems;
      break;
    case COMPONENTSTYPE.select:
      renderComponent = FormSelect;
      break;
      case COMPONENTSTYPE.checkBoxInput:
        renderComponent = CheckboxInput;
        break;
      
    default:
      renderComponent = FormInput;
      break;
  }
  return renderComponent
}


const SharedForm = ({ actionSubmit,createModel, inputs,childElement, haveMoneyInputs }: ISharedForm) => {
  const [state, setstate] = useState<any>({inputs: [],itemState:{} })

  const [currency, setCurrency] = React.useState('$');
  const { loadingRequest } = useSelector((state: RootState) => state.requestReducer);
  const dispatch: AppDispatch = useDispatch();

  const setFormData = (data: any) => {
    const model = createModel(data)
   dispatch(actionSubmit(model)).then(() => {
      let  clearItemsState = {...state.itemState}
      let oldState:any;
      state.inputs.forEach((element:any) => {
        reset({ [element.name]: "" }); 
        if(element.hasArrayElements){
        clearItemsState[element.hasArrayElements.arrayItemName] = []
        }
      });
      oldState = {...state}
      oldState.itemState = clearItemsState
      setstate(oldState)
   })
  }

  const { t: tranlation } = useTranslation();
  const { handleSubmit, reset, control, formState: { errors } } = useForm();

  useEffect(() => {
    const newObject = {...state.itemState}
     
    inputs.forEach(element => {
      debugger
      element["Component"] = setComponent(element.componentName)
      if(element.hasArrayElements){
        newObject[element.hasArrayElements.arrayItemName] = []
        if(element.hasArrayElements.arrayValues?.length > 0){
          element.hasArrayElements.arrayValues.forEach((item:any) => {
          newObject[element.hasArrayElements.arrayItemName].push(item)
          })
        }
      }
    });
    setstate({inputs,itemState:newObject })
  }, [inputs])

  return (

    <form  style={{ width: "100%" }} onSubmit={handleSubmit(setFormData)}>
      <Grid container spacing={1}>
        {haveMoneyInputs &&
          <Grid item xs={12} md={6} >
            <CurrencyComponent setCurrency={setCurrency} currency={currency} currencyLabel={tranlation("labels.stockForm.currencyLabel")} />
          </Grid>}
        {state.inputs && state.inputs.map((element: any) => {
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
              errorobj={errors}
              defaultValue={element.defaultValue}
              placeholder={element.placeholder}
              state={state}
              setItemState={setstate}
              hasArrayElements={element.hasArrayElements}
              startAdornment={element.startAdornment}
              endAdornment={element.endAdornment}
            />
          </Grid>)
        })}
        {childElement && 
        <Grid item xs={12} md={12} >
            {childElement}
          </Grid>}
       
        <Grid item xs={12} md={12} >
          <LoadingButton
            isLoading={loadingRequest}
            textButton={tranlation("labels.formButton")}
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