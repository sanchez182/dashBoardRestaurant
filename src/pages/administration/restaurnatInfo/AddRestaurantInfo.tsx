import React, { FC, useEffect } from "react";
import { COMPONENTSTYPE } from "../../../components/EnumsComponents";
import SharedForm from "../../../components/SharedForm";
import Grid from "@material-ui/core/Grid";
import PhoneButton from "@material-ui/icons/Phone";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import TimerIcon from "@material-ui/icons/Timer";
import SwitchServices from "./SwitchServices";
import SwitchSchedule from "./SwitchSchedule";
import { RootState } from "../../../store";
import { useSelector } from "react-redux";
import { updateRestaurantInfo } from "../../../actionsApi/restaurantActionsApi";
import { IService } from "../../../store/actions/actionsInterfaces/IRestaurantActions";

const AddRestaurantInfo: FC = () => {
  const { name, tableList, phoneList, restaurantDescription, foodTypeList,services, foodTimeList } = useSelector((state: RootState) => state.restaurantData.restaurantInfo);
  debugger
  //   const startAdornment = <InputAdornment position="start">{adorn}</InputAdornment>
  const [state, setState] = React.useState<IService>({
    express: false,
    inSite: false,
    toGo: false,
  });

 useEffect(() => {
    setState({
      express: services.express,
      inSite: services.inSite,
      toGo: services.toGo,
    });
  }, [services]) 

  const [schedule, setSchedule] = React.useState({
    monday: false,
    mondayText: "",
    tuesday: false,
    tuesdayText: "",
    wednesday: false,
    wednesdayText: "",
    tursday: false,
    tursdayText: "",
    friday: false,
    fridayText: "",
    saturday: false,
    saturdayText: "",
    sunday: false,
    sundayText: "",
  });

  const renderFood = () => {
    let timeList: string[] = []
    foodTypeList.forEach((element) => {
      timeList.push(element.foodTypeName)
    })
    return timeList
  }

  const createModel = (data: any) => {
    const body = {
      restaurantDescription: data.restaurantDescription,
      ubication: {
        long: 123,
        lat: 323
      },//data.ubication,
      foodTypeList: data.foodTypeList,
      foodTimeList: data.foodTimeList,
      phoneList: data.phone,
      quantityTables: data.quantityTables,
      services:
        { express: state.express, inSite: state.inSite, toGo: state.toGo }
      ,
      schedule: [
        { day: "monday", hour: schedule.mondayText },
        { day: "tuesday", hour: schedule.tuesdayText },
        { day: "wednesday", hour: schedule.wednesdayText },
        { day: "tursday", hour: schedule.tursdayText },
        { day: "friday", hour: schedule.fridayText },
        { day: "saturday", hour: schedule.saturdayText },
        { day: "sunday", hour: schedule.sundayText },
      ],
    };
    debugger;
    return body;
  };

  const inputs = [
    {
      name: "restaurantDescription",
      label: "labels.restaurantInfo.restaurantDescription",
      componentName: COMPONENTSTYPE.input,
      defaultValue: restaurantDescription,
      rules: {
        required: "labels.restaurantInfo.fieldError",
      },
    },
    {
      name: "ubication",
      label: "labels.restaurantInfo.ubication",
      componentName: COMPONENTSTYPE.input,
      rules: {
        required: "labels.restaurantInfo.fieldError",
      },
    },
    {
      name: "foodTypeList",
      label: "labels.restaurantInfo.foodTypeList",
      componentName: COMPONENTSTYPE.inputAddItems,
      hasArrayElements: {
        arrayItemName: "foodTypeList",
        iconList: <FastfoodIcon />,
      },
    },
    {
      name: "foodTimeList",
      label: "labels.restaurantInfo.foodTimeList",
      componentName: COMPONENTSTYPE.inputAddItems,
      hasArrayElements: {
        arrayItemName: "foodTimeList",
        arrayValues: renderFood(),
        iconList: <TimerIcon />,
      },
    },
    {
      name: "phone",
      type: "number",
      label: "labels.restaurantInfo.phone",
      componentName: COMPONENTSTYPE.inputAddItems,
      rules: {
        maxLength: {
          value: 8,
          message: "labels.restaurantInfo.phoneMaxlength",
        },
      },
      placeholder: "00000000",
      hasArrayElements: {
        arrayItemName: "telephones",
        arrayValues: phoneList,
        iconList: <PhoneButton />,
      },
    },
    {
      name: "quantityTables",
      type: "number",
      defaultValue: tableList.length,
      label: "labels.restaurantInfo.quantityTables",
      componentName: COMPONENTSTYPE.input,
      rules: {
        required: "labels.restaurantInfo.fieldError",
      },
    },
    /*  {
           name: "Price",
           type: 'number',
           currency: true,
           label: "labels.stockForm.price",
           componentName: COMPONENTSTYPE.input,
           rules:{
             required: "labels.stockForm.priceError", 
           }} */
  ];

  const childElement = (
    <Grid container>
      <Grid item xs={12} md={6}>
        <SwitchServices setState={setState} state={state} />
      </Grid>
      <Grid item xs={12} md={6}>
        <SwitchSchedule setSchedule={setSchedule} state={schedule} />
      </Grid>
    </Grid>
  );

  return (
    <>
      <Grid container justify={"flex-start"} alignContent="center" alignItems={"center"}>

        <img
          src={require("../../../assets/restaurant-logo-5.png").default}
          alt="Avatar"
          style={{
            borderRadius: "50%",
            width: "342px",
            height: "313px",
            backgroundSize: "contain",
            backgroundPosition: "center",
            marginRight: "47px",
            marginBottom: "16px"
          }}
        />
        <h1>{name}</h1>
      </Grid>

      <SharedForm
        childElement={childElement}
        createModel={createModel}
        actionSubmit={updateRestaurantInfo}
        inputs={inputs}
        haveMoneyInputs={false}
      />
    </>
  );
};

export default React.memo(AddRestaurantInfo);
