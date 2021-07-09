import React, { FC } from 'react';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addStock } from '../../actionsApi/stockActions';
import { COMPONENTSTYPE } from '../../components/EnumsComponents';
import SharedForm from '../../components/SharedForm'; 
import { RootState } from '../../store';

const AddStock: FC = () => {
  const dispatch = useDispatch()
  const {  idRestaurant } = useSelector((state: RootState )=> state.auth);

  const onSubmit = useCallback(
    (data:any) => {
      const model = {
        idRestaurant,
        itemStock : [{
          itemdDescription: data.productName,
          quantityPortion: data.productName,
          registerDate: Date.now()
        }] 
      }
      dispatch(addStock(model))
    },
    [idRestaurant,dispatch],
  )
 
  const inputs = [
    {
        name: "productName",
        label: "labels.stockForm.productName",
        componentName: COMPONENTSTYPE.input,
        rules:{
          required:"labels.stockForm.productNameError"}
    },
  {
    name: "Quantity Portions",
    type: 'number',
    label: "labels.stockForm.quantityPortions",
    componentName: COMPONENTSTYPE.input,
    rules:{
      required: "labels.stockForm.quantityPortionsError", 
    }}
    ,
   /*  {
      name: "Price",
      type: 'number',
      currency: true,
      label: "labels.stockForm.price",
      componentName: COMPONENTSTYPE.input,
      rules:{
        required: "labels.stockForm.priceError", 
      }} */
]


  return (
      <SharedForm onSubmit={onSubmit} inputs={inputs} haveMoneyInputs={false}/>
  );
};

export default React.memo(AddStock)