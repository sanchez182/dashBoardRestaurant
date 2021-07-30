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
import { setScheduleState } from "./setSchedule";
import InputMultiItem from "./InputMultiItem";
import { IService } from "../../../store/actions/actionsInterfaces/IRestaurantActions";
import { FormControlLabel } from "@material-ui/core";
import Switch from '@material-ui/core/Switch';
import { useTranslation } from "react-i18next";

const AddRestaurantInfo: FC = () => {
  const restaurantData = useSelector((state: RootState) => state.restaurantData);
  const { restaurantInfo } = restaurantData
  const { name, phoneList, restaurantDescription, isOpen, schedule, email,ubication, foodTypeList, services, foodTimeList } = restaurantInfo
  const { t } = useTranslation();
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
  const [timeList, setTimeList] = React.useState<any>([]);
  const [typeList, setTypeList] = React.useState<any>([]);
  const [inputsForm, setInputsForm] = React.useState<any>([]);
  const [isOpenCheck, setIsOpen] = React.useState<boolean>(false);

  //#endregion 

  useEffect(() => {
    const newSchedule = setScheduleState({ ...scheduleState }, schedule)
    
    setSchedule(newSchedule);
    setTimeList(foodTimeList)
    setTypeList(foodTypeList)
    setInputsForm(inputs);
    setIsOpen(isOpen)
    setState({
      express: services.express,
      inSite: services.inSite,
      toGo: services.toGo,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurantData])


  const createModel = async (data: any, itemState: any) => {
    const ubicationSplit = data.ubication.split(",")
    const body = {
      restaurantDescription: data.restaurantDescription,
      img: "",
      email: data.email,
      createdDate: Date.now(),
      updatedRegister: Date.now(),
      ubication: {
        direction: data.direction,
        long: ubicationSplit[0],
        lat: ubicationSplit[1]
      },//data.ubication,
      drinkTypeList: [],
      foodTypeList: typeList,
      foodTimeList: timeList,
      phoneList: itemState.telephones,
      // tableList: data.quantityTables,
      isOpen: isOpenCheck,
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
    ;
    return body;
  };

  const inputs =
    [
      {
        name: "restaurantDescription",
        label: "labels.restaurantInfo.restaurantDescription",
        componentName: COMPONENTSTYPE.input,
        defaultValue: restaurantDescription,
        rules: {
          required: "labels.requiredField",
        },
      },{
        name: "email",
        label: "labels.email",
        componentName: COMPONENTSTYPE.input,
        defaultValue: email,
        rules: {
          required: "labels.requiredField",
          pattern: {
            message: "labels.emailFormatError",
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          } 
        }
      },
      {
        name: "direction",
        label: "labels.restaurantInfo.direction",
        componentName: COMPONENTSTYPE.input,
        defaultValue: ubication.direction,
        rules: {
          required: "labels.requiredField",
        },
      }, {
        name: "ubication",
        label: "labels.restaurantInfo.ubication",
        componentName: COMPONENTSTYPE.input,
        defaultValue: `${ubication.long},${ubication.lat}`,
        rules: {
          required: "labels.requiredField",
        },
        placeholder: "Example : 1233, -12333"
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
      }
    ];




  const childElement = (
    <Grid container spacing={1}>

      <Grid item xs={12} md={6}>
        <InputMultiItem itemList={timeList} setItemList={setTimeList}
          controlLabel="Show in Menu"
          inputLabel="labels.restaurantInfo.foodTimeList"
          itemName="foodTimeName"
          iconList={<TimerIcon />}
          controlName="showInApp" />
      </Grid>
      <Grid item xs={12} md={6}>
        <InputMultiItem itemList={typeList} setItemList={setTypeList}
          controlLabel="Show in Menu"
          inputLabel="labels.restaurantInfo.foodTypeList"
          itemName="foodTypeName"
          iconList={<FastfoodIcon />}
          controlName="showInApp" />
      </Grid>
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
      <Grid container justify={"flex-end"} alignContent="center" alignItems={"center"}>
      <FormControlLabel
        control={<Switch
          color="primary" checked={isOpenCheck} onChange={(event: any) => { setIsOpen(event.target.checked) }} name={"isOpen"} />}
        label={t("labels.restaurantInfo.isOpen")}
      />      </Grid>
      {
        inputsForm &&
        <SharedForm
        clearFormAfterAction={false}
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
