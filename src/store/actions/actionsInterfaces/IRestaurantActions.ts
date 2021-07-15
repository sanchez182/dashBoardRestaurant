export const GET_RESTAURANT = 'GET_RESTAURANT';
export const UPDATE_SELECTED_TABLE = 'UPDATE_SELECTED_TABLE';
export const SET_SERVICES = 'SET_SERVICES';

export interface Itable {
  _id: String | null,
  tableNumber : number,
  selected: false
}

interface IFoodTypeList {
  foodTypeName: string,
  isActive: boolean,
  showInApp: boolean,
}

export interface ISchedule {
  day: string;
  hour: string;
  open: boolean;
}

 interface IUbication {
  long: number | null,
  lat: number | null,
  direction: string | null,
}


export interface IService  {express: boolean, inSite: boolean, toGo: boolean }
 

export interface IModelRestaurant { restaurantInfo : {
  _id: String | null,
  restaurantDescription: String | null,
  name: String,
  ubication: IUbication,
  img: String,
  foodTimeList: [],
  foodTypeList: IFoodTypeList[],
  drinkTypeList: [],
  phoneList: [],
  schedule: ISchedule[],
  services:IService
}}


interface SetRestaurantAction {
  type: String;
  payload: IModelRestaurant;
}

export type IRestaurant = SetRestaurantAction;