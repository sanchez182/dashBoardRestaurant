import React, { FC } from 'react';
import { COMPONENTSTYPE } from '../../components/EnumsComponents';
import SharedForm from '../../components/SharedForm';

const numberData = [
    {
      id: "1",
      label: "Vegana",
    },
    {
      id: "2",
      label: "Vegetariana",
    },
    {
      id: "3",
      label: "Todo",
    },
  ];
  
const AddPlate: FC = () => {

  const inputs = [
    {
        name: "plateName",
        label: "labels.plateForm.plateName",
        componentName: COMPONENTSTYPE.input,
        rules:{
          required: 'First name required',
          maxLength: {
            value: 4,
            message: 'This input exceed maxLength.',
          }}
    },
    {
      name: "plateDescription",
      label: "labels.plateForm.plateDescription",
      componentName: COMPONENTSTYPE.input,
      rules:{
        required: 'Apellido required',
        maxLength: {
          value: 4,
          message: 'This input exceed maxLength.',
        }}
  }, 
  {
    name: "foodTypeName",
    label: "labels.plateForm.foodTypeName",
    componentName: COMPONENTSTYPE.select, 
    options:numberData, 
    rules:{
      required: 'Apellido required',
      maxLength: {
        value: 4,
        message: 'This input exceed maxLength.',
      }}
}
]
  return (
      <SharedForm actionSubmit={()=>{}} inputs={inputs} haveMoneyInputs={false}/>
  );
};

export default React.memo(AddPlate)