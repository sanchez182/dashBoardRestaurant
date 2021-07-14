
export const SET_ORDER_STATE = 'SET_ORDER_STATE'; 

export interface IOrder {
  _id: String | null,
  idRestaurant: String | null,
  tableNumber: number,
  itemsOrder: {
    itemsFood: [],
    itemsDrink: [],
  }
  state: String,
  date: Date | null
}
 

 

export interface IOrdersModel { orders : IOrder[]}


interface SetOrderAction {
  type: String;
  payload: IOrdersModel;
}

export type IOrders= SetOrderAction;