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

export interface IService  {express: boolean, inSite: boolean, toGo: boolean }
interface IData {
  _id: String | null,
  restaurantDescription: String | null,
  name: String,
  ubication: any,
  img: String,
  foodTimeList: [],
  foodTypeList: IFoodTypeList[],
  drinkTypeList: [],
  phoneList: [],
  services:IService,
  tableList: Itable[]
}
 

export interface IModelRestaurant { restaurantInfo : IData}


interface SetRestaurantAction {
  type: String;
  payload: IModelRestaurant;
}

export type IRestaurant = SetRestaurantAction;