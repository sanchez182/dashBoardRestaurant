import React, { FC } from 'react';
import { useCallback } from 'react';
import { COMPONENTSTYPE } from '../../components/EnumsComponents';
import SharedForm from '../../components/SharedForm';

const numberData = [
    {
      id: "10",
      label: "Ten",
    },
    {
      id: "20",
      label: "Twenty",
    },
    {
      id: "30",
      label: "Thirty",
    },
  ];
  
const AddPlate: FC = () => {
  const onSubmit = useCallback(
    (data:any) => {
      console.log(data);
    },
    [],
  )
  const inputs = [
    {
        name: "nameV",
        label: "Name",
        componentName: COMPONENTSTYPE.input,
        rules:{
          required: 'First name required',
          maxLength: {
            value: 4,
            message: 'This input exceed maxLength.',
          }}
    },
    {
      name: "apellido",
      label: "Apellido",
      componentName: COMPONENTSTYPE.input,
      rules:{
        required: 'Apellido required',
        maxLength: {
          value: 4,
          message: 'This input exceed maxLength.',
        }}
  },
  {
    name: "selV",
    label: "Numbers",
    options:numberData, 
    componentName: COMPONENTSTYPE.select,
    rules:{
      required: 'SelV is required'
    }}
]
  return (
      <SharedForm onSubmit={onSubmit} inputs={inputs} />
  );
};

export default React.memo(AddPlate)