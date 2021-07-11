import React, { FC } from 'react';
import { addStock } from '../../actionsApi/stockActions';
import { COMPONENTSTYPE } from '../../components/EnumsComponents';
import SharedForm from '../../components/SharedForm'; 

 
const AddStock: FC = () => {
  const inputs = [
    {
        name: "productName",
        label: "labels.stockForm.productName",
        componentName: COMPONENTSTYPE.input,
        rules:{
          required:"labels.stockForm.productNameError"}
    },
  {
    name: "quantityPortions",
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
      <SharedForm actionSubmit={addStock} inputs={inputs} haveMoneyInputs={false}/>
  );
};

export default React.memo(AddStock)