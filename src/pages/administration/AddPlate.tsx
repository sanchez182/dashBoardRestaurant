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
import { getAllPlates,deletePlates } from '../../actionsApi/plateActions';

const emptyProduct = {
  _id: null,
  plateName: '',
  urlImage: null,
  idImg: "",
  description: '',
  foodType: null,
  foodTime: null,
  price: 0,
  ingredients: []
};
 
interface IinterfaceList {
  id: number,
  label: string,
}

const defaultImg = require("../../assets/no-Image-Placeholder.png").default

const defaultList = {
  isValid: false, message: '',
  required: true,
  list: []
}
const AddPlate: FC = () => {
  const { t } = useTranslation();
  const { foodTypeList, foodTimeList } = useSelector((state: RootState) => state.restaurantData.restaurantInfo);
  //#region States
  const [selectList, setSelectList] = useState<{ foodType: IinterfaceList[], foodTime: IinterfaceList[] }>({ foodType: [], foodTime:[] })
  const [inputsForm, setInputsForm] = React.useState<any>([]);

  const [products, setProducts] = useState<any>([]);
  const [plateActive, setPlateActive] = useState<any>(false)
  const [ingredientList, setIngredientList] = React.useState<any>(defaultList);
  const [urlImage, setUrlImage] = useState<any>(defaultImg)
  const [product, setProduct] = useState(emptyProduct);

  //#endregion


  //#region effects
 
  useEffect(() => {
    const foodType: IinterfaceList[] = [];
    const foodTime: IinterfaceList[] = [];
    foodTypeList.forEach((element, index) => {
      foodType.push({
        id: index,
        label: element.foodTypeName
      })
    })

    foodTimeList.forEach((element, index) => {
      foodTime.push({
        id: index,
        label: element.foodTimeName
      })
    })

    const data = {
      foodType,
      foodTime
    }
    setSelectList(data)
    setInputs(data)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
 
  const setInputs = useCallback((selectList) => {
    setInputsForm([
      {
        name: "plateName",
        label: "labels.plateForm.plateName",
        componentName: COMPONENTSTYPE.input,
        defaultValue: product.plateName,
        rules: {
          required: 'plate name required',
          maxLength: {
            value: 60,
            message: 'This input exceed maxLength.',
          }
        }
      },
      {
        name: "description",
        label: "labels.plateForm.plateDescription",
        multiLine: true,
        componentName: COMPONENTSTYPE.input,
        defaultValue: product.description,
        rules: {
          required: 'plate description required',
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
        defaultValue:  selectList.foodType.find((x: any) => x.label === product.foodType)?.id,
        options: selectList.foodType,
        rules: {
          required: 'Food type required',
          maxLength: {
            value: 4,
            message: 'This input exceed maxLength.',
          }
        }
      }, {
        name: "foodTimeName",
        label: "labels.plateForm.foodTimeName",
        componentName: COMPONENTSTYPE.select,
        defaultValue:  selectList.foodTime.find((x: any) => x.label === product.foodTime)?.id,
        options: selectList.foodTime,
        rules: {
          required: 'Food type required',
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.foodType, product.description, product.plateName, product.price])

  useEffect(() => {
    if (selectList.foodType.length > 0 && product._id !== null) {
      setInputs(selectList)
    }
  }, [selectList, product, setInputs])

  
  //#endregion

 const deletePlate = async(selectedProducts:any[])=>{
   const valueList  : any[] = []
   selectedProducts.forEach(item=>{
     valueList.push( { 
       idPlate: item._id,
       idImg: item.idImg })
   })
  return await deletePlates(valueList)
 }

  const renderDataInDialog = (data: any) => {
    return (
      <Grid container>
        <Grid container justifyContent="center">
          <img src={data.urlImage}
            onError={(e: any) => {
              e.target.src = defaultImg
            }} alt='plate-restaurant'
            style={{ width: "300px",borderRadius:"54px", height: "286px" }}
          />
        </Grid>
        {renderTemplate("labels.plateForm.plateName", data.plateName)}
        {renderTemplate("labels.stockForm.price", data.price)}
        {renderTemplate("labels.plateForm.plateDescription", data.description)}
        {renderTemplate("labels.plateForm.foodTypeName", data.foodType)}
        {renderTemplate("labels.plateForm.foodTimeName", data.foodTime)}
        <Grid item xs={12} md={12}>
          <h3>{t("labels.plateForm.ingredients")} </h3>
          <ul>{data.ingredients.map((element: any) => {
            return (<li>{element.ingredientName} 
            {element.portions > 0 &&
            <strong> - {t("labels.stockForm.quantityPortions")} :  {element.portions}</strong>
            }
            </li>)
          })}</ul>
        </Grid>
      </Grid>
    )
  }

  const renderTemplate = (title: string, value: string) => {
    return <Grid item xs={12} md={12} style={{ marginBottom: "12px" }}>
      <h3>{t(title)}: </h3>
      <p> {value}</p>
    </Grid>

  }

  const setSeleted = (data: any) => {
    setProduct(data);
    setPlateActive(data.showInMenu)
    setIngredientList({ list: data.ingredients, isValid: true, message: '' });
    setUrlImage(data.urlImage);
  }

  const checkInputsStatus = () => {
    if (ingredientList.list.length <= 0) {
      setIngredientList({ ...ingredientList, isValid: false, message: t('atItemRequired') })
      return false
    }
    return true
  }

  const createOrUpdate = async (data: any) => {
    const { plate } = await createOrUpdatePlate(data)
    const newData: any = [...products]
    if (product._id) {
      const index = newData.findIndex((x: any) => x._id === plate._id)
      newData[index] = plate
      setProducts(newData);

    } else {
      newData.push(plate);
      setProducts(newData);
    }
    clearScreen();
  }

  const clearScreen = () => {
    setProduct(emptyProduct);
    setUrlImage(defaultImg);
    setIngredientList(defaultList)
  }
  const createModel = async (data: any) => {

    if (memoizedCheckInputsStatus()) {
      let uploadedImage = null
      let idImg = null
      if (product._id) {
        if (product.urlImage !== urlImage) {
          uploadedImage = await sendImageToCloudinary(urlImage, product.idImg)
        } else {

          uploadedImage = product.urlImage
          idImg = product.idImg
        }
      } else {
        if (typeof urlImage === 'object') {
          uploadedImage = await sendImageToCloudinary(urlImage, '')
        } else {
          uploadedImage = urlImage;
          idImg = '';
        }

      }
      return {
        _id: product._id,
        urlImage: uploadedImage,
        idImg: idImg,
        showInMenu: plateActive,
        plateName: data.plateName,
        description: data.description,
        foodTime: selectList?.foodTime.find((x:any) => x.id === data.foodTimeName)?.label,
        foodType: selectList?.foodType.find((x) => x.id === data.foodTypeName)?.label,
        updatatedDate: Date.now(),
        price: data.price,
        ingredients: ingredientList.list
      };
    } else {
      return false
    }
  };

  const memoizedCheckInputsStatus = useCallback(checkInputsStatus, [ingredientList, t])
  const memoizedCreateModel = useCallback(createModel, [memoizedCheckInputsStatus, product._id, product.urlImage, product.idImg, plateActive, selectList, ingredientList.list, urlImage])

  const childElement = (
    <Grid container spacing={1}>
      <Grid item xs={12} md={6}>
        <FormControlLabel
          control={<Switch
            color="primary" checked={plateActive} onChange={(event) => {
              setPlateActive(event.currentTarget.checked)
            }} name="plateActive" />}
          label={ t('showInMenu')}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <InputMultiControl itemList={ingredientList} setItemList={setIngredientList}
          inputLabel="labels.plateForm.ingredients"
          itemName="ingredientName"
          iconList={<LocalPizzaIcon />} />
      </Grid>
      <Grid item xs={12} md={12}>
        <CloudinayComponent urlImage={urlImage}
          setUrlImage={setUrlImage} />
      </Grid>
    </Grid>
  );

  const renderColumns =[
    {field: "plateName", header: t("labels.plateForm.plateName") },
    {field: "foodType", header: t("labels.plateForm.foodTypeName") },
  ]

  return (
    <>
      {inputsForm &&
        <SharedForm
          clearFormAfterAction={true}
          childElement={childElement}
          actionSubmit={createOrUpdate}
          inputs={inputsForm} createModel={memoizedCreateModel} haveMoneyInputs={false} />
      }
     <ItemList 
        renderColumns={renderColumns}
        deleteItems = {deletePlate}
        getItems={getAllPlates}
        product={product}
        renderDataInDialog={renderDataInDialog}
        products={products}
        setProducts={setProducts}
        setProduct={setSeleted}
      />
    </>
  );
};

export default React.memo(AddPlate)