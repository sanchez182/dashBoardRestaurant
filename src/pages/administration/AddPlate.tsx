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
import { createUrlImage, sendImageToCloudinary } from '../../components/cloudinaryFunctions';
import { useDispatch } from 'react-redux';
import { setImages } from '../../store/actions/imagesActions';


const AddPlate: FC = () => {


  const { foodTypeList } = useSelector((state: RootState) => state.restaurantData.restaurantInfo);
  const dispatch = useDispatch();
  const [typeList, setTypeList] = useState<any>([])
  const [inputsForm, setInputsForm] = React.useState<any>([]);

  const [plateActive, setPlateActive] = useState<boolean>(false)
  const [ingredientList, setIngredientList] = React.useState<any>([]);
  const [dataState, setDataState] = useState({
    loading: false,
    image: '',
    urlImage: '',
    newImage: ''
  })
  const inputs = [
    {
      name: "plateName",
      label: "labels.plateForm.plateName",
      componentName: COMPONENTSTYPE.input,
      rules: {
        required: 'First name required',
        maxLength: {
          value: 4,
          message: 'This input exceed maxLength.',
        }
      }
    },
    {
      name: "plateDescription",
      label: "labels.plateForm.plateDescription",
      multiLine: true,
      componentName: COMPONENTSTYPE.input,
      rules: {
        required: 'Apellido required',
        maxLength: {
          value: 4,
          message: 'This input exceed maxLength.',
        }
      }
    },
    {
      name: "foodTypeName",
      label: "labels.plateForm.foodTypeName",
      componentName: COMPONENTSTYPE.select,
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
      name: "Price",
      type: 'number',
      currency: true,
      label: "labels.stockForm.price",
      componentName: COMPONENTSTYPE.input,
      rules: {
        required: "labels.stockForm.priceError",
      }
    }
  ]

  useEffect(() => {
    const arrayType: { id: number; label: string; }[] = [];
    foodTypeList.forEach((element, index) => {
      arrayType.push({
        id: index,
        label: element.foodTypeName
      })

      setTypeList(arrayType)
    })
  }, [foodTypeList])

  useEffect(() => {
    if(typeList.length > 0){
      
    setInputsForm(inputs);
    }
  }, [typeList])

  const createModel = async (data: any) => {
    debugger
    const uploadedImage = await sendImageToCloudinary(dataState)
    debugger
    const createImage = await createUrlImage(uploadedImage)
    dispatch(setImages(createImage))
debugger
    return  {
      img: uploadedImage.secure_url,
      plateName: data.plateName,
      plateDescription: data.plateDescription,
      foodTypeName: data.foodTypeName,
      updatatedDate: Date.now(),
      price: data.price
    };
  };



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
        <SharedForm actionSubmit={() => { }}
          childElement={childElement} inputs={inputsForm} createModel={createModel} haveMoneyInputs={true} />
      }

      <ItemList />

    </>
  );
};

export default React.memo(AddPlate)