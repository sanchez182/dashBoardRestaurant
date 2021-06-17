export const GET_RESTAURANT_TABLE = 'GET_RESTAURANT_TABLE';
export const CHECKING_TABLE_SELETED = 'CHECKING_TABLE_SELETED';




export interface IModelRestaurantTable {
  tableNumer: Number,
  selected: Boolean,
  idRestaurant: number
}

interface SetTableAction {
  type: String;
  payload: IModelRestaurantTable;
}

export type IRestaurantTables = SetTableAction;