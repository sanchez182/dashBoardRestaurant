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
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { createOrUpdateDrink, getAllDrinks,deleteDrinks } from '../../actionsApi/drinkActions';


const emptyProduct = {
  _id: null,
  drinkName: '',
  urlImage: null,
  idImg: "",
  description: '',
  drinkType: null,
  price: 0,
  ingredients: []
};
 

const defaultImg = require("../../assets/no-Image-Placeholder.png").default

const defaultList = {
  isValid: true, message: '',
  required: false,
  list: []
}
const AddDrink: FC = () => {
  const { t } = useTranslation();
  const {  drinkTypeList } = useSelector((state: RootState) => state.restaurantData.restaurantInfo);
  //#region States
  const [selectList, setSelectList] = useState<{id: number, label: string}[]>([])
  const [inputsForm, setInputsForm] = React.useState<any>([]);

  const [products, setProducts] = useState<any>([]);
  const [drinkActive, setPlateActive] = useState<any>(false)
  const [ingredientList, setIngredientList] = React.useState<any>(defaultList);
  const [urlImage, setUrlImage] = useState<any>(defaultImg)
  const [product, setProduct] = useState(emptyProduct);

  //#endregion


  //#region effects
 
  useEffect(() => { 
    const drinkType: {id: number, label: string}[] = [];
    drinkTypeList.forEach((element, index) => {
      drinkType.push({
        id: index,
        label: element.drinkTypeName
      })
    }) 
    setSelectList(drinkType)
    setInputs(drinkType)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
 
  const setInputs = useCallback((selectList) => {
    setInputsForm([
      {
        name: "drinkName",
        label: "labels.drinkForm.drinkName",
        componentName: COMPONENTSTYPE.input,
        defaultValue: product.drinkName,
        rules: {
          required: 'drink name required',
          maxLength: {
            value: 60,
            message: 'This input exceed maxLength.',
          }
        }
      },
      {
        name: "description",
        label: "labels.drinkForm.drinkDescription",
        multiLine: true,
        componentName: COMPONENTSTYPE.input,
        defaultValue: product.description,
        rules: {
          required: 'drink description required',
          maxLength: {
            value: 500,
            message: 'This input exceed maxLength.',
          }
        }
      },
      {
        name: "drinkTypeName",
        label: "labels.drinkForm.drinkTypeName",
        componentName: COMPONENTSTYPE.select,
        defaultValue:  selectList?.find((x: any) => x.label === product.drinkType)?.id,
        options: selectList,
        rules: {
          required: 'Drink type required',
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
  }, [product.drinkType, product.description, product.drinkName, product.price])

  useEffect(() => {
    if (selectList.length > 0 && product._id !== null) {
      setInputs(selectList)
    }
  }, [selectList, product, setInputs])

  
  //#endregion



  const renderDataInDialog = (data: any) => {
    return (
      <Grid container>
        <Grid container justifyContent="center">
          <img src={data.urlImage}
            onError={(e: any) => {
              e.target.src = defaultImg
            }} alt='drink-restaurant'
            style={{ width: "300px",borderRadius:"54px", height: "286px" }}
          />
        </Grid>
        {renderTemplate("labels.drinkForm.drinkName", data.drinkName)}
        {renderTemplate("labels.stockForm.price", data.price)}
        {renderTemplate("labels.drinkForm.drinkDescription", data.description)}
        {renderTemplate("labels.drinkForm.drinkTypeName", data.drinkType)}
        {data.ingredients.lenght > 0 &&
         <Grid item xs={12} md={12}>
          <h3>{t("labels.drinkForm.ingredients")} </h3>
          <ul>{data.ingredients.map((element: any) => {
            return (<li>{element.ingredientName} 
            {element.portions > 0 &&
            <strong> - {t("labels.stockForm.quantityPortions")} :  {element.portions}</strong>
            }
            </li>)
          })}</ul>
        </Grid>
        }
       
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


  const createOrUpdate = async (data: any) => {
    const { drink } = await createOrUpdateDrink(data)
    const newData: any = [...products]
    if (product._id) {
      const index = newData.findIndex((x: any) => x._id === drink._id)
      newData[index] = drink
      setProducts(newData);

    } else {
      newData.push(drink);
      setProducts(newData);
    }
    clearScreen();
  }

  const clearScreen = () => {
    setProduct(emptyProduct);
    setUrlImage(defaultImg);
    setIngredientList({
      isValid: false, message: '',
      list: []
    })
  }
  const createModel = async (data: any) => {
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
        showInMenu: drinkActive,
        drinkName: data.drinkName,
        description: data.description,
        drinkType: selectList?.find((x:any) => x.id === data.drinkTypeName)?.label,
        updatatedDate: Date.now(),
        price: data.price,
        ingredients: ingredientList.list
      };
  };

  const deleteDrink = async(selectedProducts:any[])=>{
    const valueList  : any[] = []
    selectedProducts.forEach(item=>{
      valueList.push( { 
        idDrink: item._id,
        idImg: item.idImg })
    })
   return await deleteDrinks(valueList)
  }

  const memoizedCreateModel = useCallback(createModel, [product._id, product.urlImage, product.idImg, drinkActive, selectList, ingredientList.list, urlImage])

  const renderColumns =[
    {field: "drinkName", header: t("labels.drinkForm.drinkName") },
    {field: "drinkType", header: t("labels.drinkForm.drinkTypeName") },
  ]
  const childElement = (
    <Grid container spacing={1}>
      <Grid item xs={12} md={6}>
        <FormControlLabel
          control={<Switch
            color="primary" checked={drinkActive} onChange={(event) => {
              setPlateActive(event.currentTarget.checked)
            }} name="drinkActive" />}
          label={"show in menu"}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <InputMultiControl itemList={ingredientList} setItemList={setIngredientList}
          controlLabel="Show in Menu"
          inputLabel="labels.drinkForm.ingredients"
          itemName="ingredientName"
          iconList={<LocalPizzaIcon />}
          controlName="showInApp" />
      </Grid>
      <Grid item xs={12} md={12}>
        <CloudinayComponent urlImage={urlImage}
          setUrlImage={setUrlImage} />
      </Grid>
    </Grid>
  );

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
        deleteItems = {deleteDrink}
        getItems={getAllDrinks}
        product={product} 
        renderDataInDialog={renderDataInDialog}
        products={products}
        setProducts={setProducts}
        setProduct={setSeleted}
      /> 
    </>
  );
};

export default React.memo(AddDrink)