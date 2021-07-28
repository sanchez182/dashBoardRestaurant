import { FormControlLabel, Grid, Switch } from '@material-ui/core';
import React, { FC, useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { COMPONENTSTYPE } from '../../components/EnumsComponents';
import SharedForm from '../../components/SharedForm';
import { RootState } from '../../store';
import ItemList from './ItemList';
import InputMultiControl from './restaurnatInfo/InputMultiControl';
import LocalPizzaIcon from '@material-ui/icons/LocalPizza';
import CloudinayComponent from './CloudinayComponent';
import { sendImageToCloudinary } from '../../components/cloudinaryFunctions';
import { createOrUpdatePlate } from '../../actionsApi/plateActions';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';


let emptyProduct = {
  _id: null,
  plateName: '',
  img: null,
  plateDescription: '',
  foodType: null,
  price: 0,
  ingredients: []
};

const AddPlate: FC = () => { 
  const { t } = useTranslation();
  const { foodTypeList } = useSelector((state: RootState) => state.restaurantData.restaurantInfo);
  //#region States
 const [typeList, setTypeList] = useState<{ id: number; label: string; }[]>([])
  const [inputsForm, setInputsForm] = React.useState<any>([]);

  const [plateActive, setPlateActive] = useState<boolean>(false)
  const [ingredientList, setIngredientList] = React.useState<any>({
    isValid: false, message: '',
    list: []
  });
  const [dataState, setDataState] = useState<any>({
    image: null,
    urlImg: '',
    newImage: ''
  })
  const [product, setProduct] = useState(emptyProduct);

  //#endregion
 

  //#region effects

  useEffect(() => {
    const arrayType: { id: number; label: string; }[] = [];
    foodTypeList.forEach((element, index) => {
      arrayType.push({
        id: index,
        label: element.foodTypeName
      })
      setTypeList(arrayType)
    })
  }, [foodTypeList,product])

  useEffect(() => {
    if (typeList.length > 0) {
      setInputsForm([
        {
          name: "plateName",
          label: "labels.plateForm.plateName",
          componentName: COMPONENTSTYPE.input,
          defaultValue: product.plateName,
          rules: {
            required: 'First name required',
            maxLength: {
              value: 60,
              message: 'This input exceed maxLength.',
            }
          }
        },
        {
          name: "plateDescription",
          label: "labels.plateForm.plateDescription",
          multiLine: true,
          componentName: COMPONENTSTYPE.input,
          defaultValue: product.plateDescription,
          rules: {
            required: 'Apellido required',
            maxLength: {
              value: 500,
              message: 'This input exceed maxLength.',
            }
          }
        },
        {
          name: "foodTypeName",
          label: "labels.plateForm.foodTypeName",
          componentName: COMPONENTSTYPE.select,
          defaultValue: typeList.find((x:any)=>  x.label === product.foodType)?.id  ,
          options: typeList,
          rules: {
            required: 'Apellido required',
            maxLength: {
              value: 4,
              message: 'This input exceed maxLength.',
            }
          }
        },
        {
          name: "price",
          type: 'number',
          currency: true,
          label: "labels.stockForm.price",
          defaultValue: product.price,
          componentName: COMPONENTSTYPE.input,
          rules: {
            required: "labels.stockForm.priceError",
          }
        }
      ]);
    }
  }, [product.foodType, product.plateDescription, product.plateName, product.price, typeList])

  //#endregion



  const setSeleted=(data:any)=>{
    setProduct(data);
    setPlateActive(data.showInMenu)
    setIngredientList({list: data.ingredients, isValid: true, message: '' });
    debugger
    setDataState({urlImg:data.img});
  }

  const checkInputsStatus = () => {
    debugger
    if (ingredientList.list.length <= 0) {
      setIngredientList({ ...ingredientList, isValid: false, message: t('atItemRequired') })
      return false
    }
    return true
  }
  const createOrUpdate =(data:any)=>{
    debugger
    const pos = createOrUpdatePlate(data)
    return  pos
  }

  const createModel = async (data: any) => {
    debugger
    if (memoizedCheckInputsStatus()) {
      let uploadedImage = null
      if(!dataState.image){
        uploadedImage = '../../assets/no-Image-Placeholder.png'
      }else{
       uploadedImage = await sendImageToCloudinary(dataState)
      }
      return {
        _id: product._id,
        img: uploadedImage,
        showInMenu: true,
        plateName: data.plateName,
        plateDescription: data.plateDescription,
        foodType: typeList?.find((x) => x.id === data.foodTypeName)?.label,
        updatatedDate: Date.now(),
        price: data.price,
        ingredients: ingredientList.list
      };
    } else {
      return false
    }
  };

  const memoizedCheckInputsStatus = useCallback(checkInputsStatus, [ingredientList, t])
  const memoizedCreateModel = useCallback(createModel, [memoizedCheckInputsStatus, dataState, ingredientList, typeList])

  const childElement = (
    <Grid container spacing={1}>
      <Grid item xs={12} md={6}>
        <FormControlLabel
          control={<Switch
            color="primary" checked={plateActive} onChange={() => setPlateActive(!plateActive)} name="plateActive" />}
          label={"show in menu"}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <InputMultiControl itemList={ingredientList} setItemList={setIngredientList}
          controlLabel="Show in Menu"
          inputLabel="labels.plateForm.ingredients"
          itemName="ingredientName"
          iconList={<LocalPizzaIcon />}
          controlName="showInApp" />
      </Grid>
      <Grid item xs={12} md={12}>
        <CloudinayComponent dataState={dataState}
          setDataState={setDataState} />
      </Grid>
    </Grid>
  );

  return (
    <>
      {inputsForm &&
        <SharedForm
          clearFormAfterAction={false}
          childElement={childElement}
          actionSubmit={createOrUpdate}
          inputs={inputsForm} createModel={memoizedCreateModel} haveMoneyInputs={true} />
      }
      <ItemList product={product} emptyProduct={emptyProduct} setProduct={setSeleted}
/>
    </>
  );
};

export default React.memo(AddPlate)