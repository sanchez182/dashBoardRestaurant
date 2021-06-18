export const GET_RESTAURANT = 'GET_RESTAURANT';
export const UPDATE_SELECTED_TABLE = 'UPDATE_SELECTED_TABLE';

export interface IModelRestaurant{
  _id: String | null,
  name: String,
  ubication: any,
  img: String,
  foodTimeList: [],
  foodTypeList: [],
  drinkTypeList: [],
  tableList: []
}
 

interface SetRestaurantAction {
  type: String;
  payload: IModelRestaurant;
}

export type IRestaurant = SetRestaurantAction;