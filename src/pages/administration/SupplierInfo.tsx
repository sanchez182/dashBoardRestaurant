import React, { FC } from "react";
import { addStock } from "../../actionsApi/stockActions";
import { COMPONENTSTYPE } from "../../components/EnumsComponents";
import SharedForm from "../../components/SharedForm";
import PhoneButton from "@material-ui/icons/Phone";

const SupplierInfo: FC = () => {

  const [phoneList, setPhoneList] = React.useState<any>([]);



  const createModel = (data: any) => {
    return {
      itemdDescription: data.productName,
      quantityPortion: data.quantityPortions,
      registerDate: Date.now(),
    };
  };

  const inputs = [
    {
      name: "supplierName",
      label: "labels.supplierForm.supplierName",
      componentName: COMPONENTSTYPE.input,
      rules: {
        required: "labels.requiredField",
      },
    },
    {
      name: "phone",
      type: "number",
      label: "labels.phone",
      componentName: COMPONENTSTYPE.inputAddItems,
      rules: {
        maxLength: {
          value: 8,
          message: "labels.restaurantInfo.phoneMaxlength",
        },
      },
      placeholder: "00000000",
      hasArrayElements: {
        clearAfterAction: false,
        arrayItemName: "telephones",
        arrayValues: phoneList,
        iconList: <PhoneButton />,
      },
    },
    {
      name: "email",
      type: "text",
      label: "labels.email",
      componentName: COMPONENTSTYPE.input,
      rules: {
        required: "labels.requiredField",
        pattern: {
          message: "labels.emailFormatError",
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        } 
      }
    }
    /*  {
      name: "Price",
      type: 'number',
      currency: true,
      label: "labels.stockForm.price",
      componentName: COMPONENTSTYPE.input,
      rules:{
        required: "labels.stockForm.priceError", 
      }} */

    ,
  ];

  return (
    <SharedForm
      actionSubmit={addStock}
      createModel={createModel}
      inputs={inputs}
      haveMoneyInputs={false}
    />
  );
};

export default React.memo(SupplierInfo);
