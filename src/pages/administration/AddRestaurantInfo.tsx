import React, { FC } from 'react';
import { addStock } from '../../actionsApi/stockActions';
import { COMPONENTSTYPE } from '../../components/EnumsComponents';
import SharedForm from '../../components/SharedForm';


const AddRestaurantInfo: FC = () => {

 //   const startAdornment = <InputAdornment position="start">{adorn}</InputAdornment>

    const inputs = [
        {
            name: "restaurantDescription",
            label: "labels.restaurantInfo.restaurantDescription",
            componentName: COMPONENTSTYPE.input,
            rules: {
                required: "labels.restaurantInfo.fieldError"
            }
        }, {
            name: "ubication",
            label: "labels.restaurantInfo.ubication",
            componentName: COMPONENTSTYPE.input,
            rules: {
                required: "labels.restaurantInfo.fieldError"
            }
        }
        , {
            name: "phone",
            label: "labels.restaurantInfo.phone",
            componentName: COMPONENTSTYPE.inputAddItems,
            rules: {
                required: "labels.restaurantInfo.fieldError"
            }
        },
        {
            name: "quantityTables",
            type: 'number',
            label: "labels.restaurantInfo.quantityTables",
            componentName: COMPONENTSTYPE.input,
            rules: {
                required: "labels.restaurantInfo.fieldError",
            }
        }
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
        <SharedForm  actionSubmit={addStock} inputs={inputs} haveMoneyInputs={false} />
    );
};

export default React.memo(AddRestaurantInfo)