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
import { IFoodTimeList, IService } from "../../../store/actions/actionsInterfaces/IRestaurantActions";
import { setScheduleState } from "./setSchedule";


const AddRestaurantInfo: FC = () => {
  const restaurantData = useSelector((state: RootState) => state.restaurantData);
  const restaurantInfo = useSelector((state: RootState) => state.restaurantData.restaurantInfo);
  const { name, phoneList, restaurantDescription, schedule, ubication, foodTypeList, services, foodTimeList } =restaurantInfo
  debugger
  //   const startAdornment = <InputAdornment position="start">{adorn}</InputAdornment>

  //#region  States 

  const [state, setState] = React.useState<IService>({
    express: false,
    inSite: false,
    toGo: false,
  });

  const [scheduleState, setSchedule] = React.useState({
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

  const [inputsForm, setInputsForm] = React.useState<any>(null);
  const [foodTimeState, setFoodTimeState] = React.useState<any>(null);

  //#endregion 

  useEffect(() => {
    const newSchedule = setScheduleState({ ...scheduleState }, schedule)
    setSchedule(newSchedule);
    setInputsForm(renderInpu())
    //renderFoodTime()
    setState({
      express: services.express,
      inSite: services.inSite,
      toGo: services.toGo,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurantData])
 

  const renderFoodTime = () => {
    let timeList: string[] = []
    debugger
    foodTimeList.forEach((element) => {
      timeList.push(element.foodTimeName)
    })
    return timeList
  }

  const renderFoodType = () => {
    let typeList: string[] = []
    foodTypeList.forEach((element) => {
      typeList.push(element.foodTypeName)
    })
    return typeList
  }

  const foodTimeCreate =(foodTimeList: any[] )=>{
    const list: IFoodTimeList[]=[];
    foodTimeList.forEach((element)=>{
      list.push({
        foodTimeName: element,
        isActive: true,
        showInApp: true
      })
    })
   return list
  }

  const createModel = (data: any, itemState: any) => {
    debugger
    const ubicationSplit = data.ubication.split(",")
    const body = {
      restaurantDescription: data.restaurantDescription,
      img: "",
      createdDate: Date.now(),
      updatedRegister: Date.now(),
      ubication: {
        direction: data.direction,
        long: ubicationSplit[0],
        lat: ubicationSplit[1]
      },//data.ubication,
      drinkTypeList: [],
      foodTypeList: itemState.foodTypeList,
      foodTimeList: foodTimeCreate(itemState.foodTimeList),
      phoneList: itemState.telephones,
     // tableList: data.quantityTables,
      isOpen: true,
      services:
        { express: state.express, inSite: state.inSite, toGo: state.toGo }
      ,
      schedule: [
        { day: "monday", hour: scheduleState.mondayText },
        { day: "tuesday", hour: scheduleState.tuesdayText },
        { day: "wednesday", hour: scheduleState.wednesdayText },
        { day: "tursday", hour: scheduleState.tursdayText },
        { day: "friday", hour: scheduleState.fridayText },
        { day: "saturday", hour: scheduleState.saturdayText },
        { day: "sunday", hour: scheduleState.sundayText },
      ],
    };
    debugger;
    return body;
  };
  const renderInpu = ()=>{
    return   [
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
        name: "direction",
        label: "labels.restaurantInfo.direction",
        componentName: COMPONENTSTYPE.input,
        defaultValue: "" ,//ubication.direction,
        rules: {
          required: "labels.restaurantInfo.fieldError",
        },
      }, {
        name: "ubication",
        label: "labels.restaurantInfo.ubication",
        componentName: COMPONENTSTYPE.input,
        defaultValue: `${ubication.long},${ubication.lat}`,
        rules: {
          required: "labels.restaurantInfo.fieldError",
        },
        placeholder: "Example : 1233, -12333"
      },
      {
        name: "foodTypeList",
        label: "labels.restaurantInfo.foodTypeList",
        componentName: COMPONENTSTYPE.inputAddItems,
        hasArrayElements: {
          arrayItemName: "foodTypeList",
          arrayValues: renderFoodType(),
          iconList: <FastfoodIcon />,
        },
      },
      {
        name: "foodTimeList",
        label: "labels.restaurantInfo.foodTimeList",
        componentName: COMPONENTSTYPE.inputAddItems,
        hasArrayElements: {
          arrayItemName: "foodTimeList",
          arrayValues: renderFoodTime(),
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
  }
 


  const childElement = (
    <Grid container>
      <Grid item xs={12} md={6}>
        <SwitchServices setState={setState} state={state} />
      </Grid>
      <Grid item xs={12} md={6}>
        <SwitchSchedule setSchedule={setSchedule} state={scheduleState} />
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
        {
          inputsForm &&
           <SharedForm
        childElement={childElement}
        createModel={createModel}
        actionSubmit={updateRestaurantInfo}
        inputs={inputsForm}
        haveMoneyInputs={false}
      />
        }
     
    </>
  );
};

export default React.memo(AddRestaurantInfo);
