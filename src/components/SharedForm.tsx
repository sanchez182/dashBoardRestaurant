import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import FormInput from '../controls/input';
import FormInputItems from '../controls/inputAddItems';
import FormSelect from '../controls/select';
import { COMPONENTSTYPE } from './EnumsComponents';
import { useTranslation } from 'react-i18next';
import CurrencyComponent from './CurrencyComponent';
import LoadingButton from './LoadingButton';
import { RootState } from '../store';
import CheckboxInput from '../controls/checkbox';
import FormSwitch from '../controls/switch';
import { useSelector } from 'react-redux';

interface ISharedForm {
  actionSubmit: any;
  inputs: any[],
  createModel?: any;
  haveMoneyInputs: boolean,
  childElement?: any;
  fullWidthForm?: boolean;
  clearFormAfterAction?: boolean;
  idElement?: string | null;
  clearScreen?: any ;

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
    case COMPONENTSTYPE.switch:
      renderComponent = FormSwitch;
      break;


    default:
      renderComponent = FormInput;
      break;
  }
  return renderComponent
}


const SharedForm = ({ actionSubmit, createModel, idElement, clearFormAfterAction,
  fullWidthForm, inputs, childElement, haveMoneyInputs,clearScreen }: ISharedForm) => {
  const [state, setstate] = useState<any>({ inputs: [], itemState: {} })

  const { t: tranlation } = useTranslation();
  const [currency, setCurrency] = React.useState('$');
  const { loadingRequest } = useSelector((state: RootState) => state.requestReducer);

  const setFormData = async (data: any) => {
    const model = await createModel(data, state.itemState, idElement)
    debugger
    if (typeof model === 'object') {
      await actionSubmit(model).then(() => {
        if (clearFormAfterAction) {
          clearScreem()
        }
      })
    }
  }

  const clearScreem=()=>{
    let myState = { ...state }
    let clearItemsState = { ...myState.itemState }
    debugger
    myState.inputs.forEach((element: any) => {
      debugger
      reset({ [element.name]: "" }); 
      if(element.defaultValue) {element.defaultValue = "";}
      if (element.hasArrayElements && element.hasArrayElements.clearAfterAction) {
        clearItemsState[element.hasArrayElements.arrayItemName] = []
      }
    });
    debugger
    myState.itemState = clearItemsState
    setstate(myState)
  }
  const { handleSubmit, reset, control, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    const newObject = { ...state.itemState }
    inputs.forEach(element => {
      element["Component"] = setComponent(element.componentName)
      if (element.hasArrayElements) {
        newObject[element.hasArrayElements.arrayItemName] = []
        if (element.hasArrayElements.arrayValues?.length > 0) {
          element.hasArrayElements.arrayValues.forEach((item: any) => {
            newObject[element.hasArrayElements.arrayItemName].push(item)
          })
        }
      }
    });
    setstate({ inputs, itemState: newObject })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputs])


  useEffect(() => {
    state.inputs.forEach((element: any) => {
      setValue(element.name, element.defaultValue);
    });
  }, [state.inputs, setValue])
  return (

    <form style={{ width: "100%" }} onSubmit={handleSubmit(setFormData)}>
      <Grid container spacing={1}>
        {haveMoneyInputs &&
          <Grid item xs={12} md={12}  >
            <CurrencyComponent setCurrency={setCurrency} currency={currency} currencyLabel={tranlation("labels.stockForm.currencyLabel")} />
          </Grid>}
        {state.inputs && state.inputs.map((element: any) => {
          debugger
          return (<Grid item xs={12} md={fullWidthForm ? 12 : 6} key={element.name}>
            <element.Component control={control}
              name={element.name}
              key={element.name}
              multiLine={element.multiLine}
              options={element.options}
              label={tranlation(element.label)}
              rules={element.rules}
              required={true}
              defaultValue={element.defaultValue}
              adorn={element.currency && currency}
              type={element.type}
              tranlation={tranlation}
              errorobj={errors}
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
            classButton="floatRight"
            handleSubmit={() => { }}
            icon=""
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default React.memo(SharedForm)