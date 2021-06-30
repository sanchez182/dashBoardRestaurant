export const GET_RESTAURANT = 'GET_RESTAURANT';
export const SET_ORDER_STATE = 'SET_ORDER_STATE';
export const UPDATE_SELECTED_TABLE = 'UPDATE_SELECTED_TABLE';

export interface IOrders {
  _id: String | null,
  idRestaurant: String | null,
  tableNumber: number,
  itemsOrder: {
    itemsFood: [],
    itemsDrink: [],
  }
  state: String,
  date: Date
}

export interface IModelRestaurant {
  _id: String | null,
  name: String,
  ubication: any,
  img: String,
  foodTimeList: [],
  foodTypeList: [],
  drinkTypeList: [],
  tableList: [],
  orders: IOrders[]
}


interface SetRestaurantAction {
  type: String;
  payload: IModelRestaurant;
}

export type IRestaurant = SetRestaurantAction;