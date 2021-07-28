import { FormControlLabel, Grid, Switch } from '@material-ui/core';
import React, { FC, useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { apiCallSuccess } from '../../store/actions/requestActions';
import { setOpenMessageAlert } from '../../store/actions/messageAlertActions';


const emptyProduct = {
  _id: null,
  plateName: '',
  urlImage: null,
  idImg: null,
  plateDescription: '',
  foodType: null,
  price: 0,
  ingredients: []
};

const defaultList = {
  isValid: false, message: '',
  list: []
}
const AddPlate: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch()
  const { foodTypeList } = useSelector((state: RootState) => state.restaurantData.restaurantInfo);
  //#region States
  const [typeList, setTypeList] = useState<{ id: number; label: string; }[]>([])
  const [inputsForm, setInputsForm] = React.useState<any>([]);

  const [products, setProducts] = useState<any>([]);
  const [plateActive, setPlateActive] = useState<any>(null)
  const [ingredientList, setIngredientList] = React.useState<any>(defaultList);
  const [urlImage, setUrlImage] = useState<any>()
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
  }, [foodTypeList, product])

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
          defaultValue: typeList.find((x: any) => x.label === product.foodType)?.id,
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



  const setSeleted = (data: any) => {
    debugger
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
    return new Promise(async (resolve, reject) => {
      await createOrUpdatePlate(data).then(({ plate }) => {
        let message = '';
        const newData: any = [...products]
        if (product._id) {
          message = 'Se actualizo correcatemente el platillo'
          const index = newData.findIndex((x: any) => x._id === plate._id)
          newData[index] = plate
          setProducts(newData);
        } else {
          newData.push(plate);
          setProducts(newData);
          message = 'Se creo correcatemente el platillo';
        }
        setUrlImage(null);
        setIngredientList(defaultList)
        dispatch(apiCallSuccess());
        dispatch(setOpenMessageAlert({ show: true, message, severity: 'success' }));
        resolve(true)
      }).catch((error) => {
        reject(error)
      })
    })
  }

  const createModel = async (data: any) => {

    if (memoizedCheckInputsStatus()) {
      let uploadedImage = null
      let idImg = null
      if (product._id) {
        if (product.urlImage !== urlImage) {
          uploadedImage = await sendImageToCloudinary(urlImage,product.idImg )
        } else {

          uploadedImage = product.urlImage
          idImg = product.idImg
        }
      } else {
        uploadedImage = await sendImageToCloudinary(urlImage,'')
      }
      return {
        _id: product._id,
        urlImage: uploadedImage,
        idImg: idImg,
        showInMenu: plateActive,
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
  const memoizedCreateModel = useCallback(createModel, [memoizedCheckInputsStatus, product._id, product.urlImage, product.idImg, plateActive, typeList, ingredientList.list, urlImage])

  const childElement = (
    <Grid container spacing={1}>
      <Grid item xs={12} md={6}>
        <FormControlLabel
          control={<Switch
            color="primary" checked={plateActive} onChange={(event) => {
              debugger
              setPlateActive(event.currentTarget.checked)}} name="plateActive" />}
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
          inputs={inputsForm} createModel={memoizedCreateModel} haveMoneyInputs={true} />
      }
      <ItemList product={product} emptyProduct={emptyProduct}
        products={products}
        setProducts={setProducts}
        setProduct={setSeleted}
      />
    </>
  );
};

export default React.memo(AddPlate)