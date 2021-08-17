
export const SET_ORDER_STATE = 'SET_ORDER_STATE'; 
export const UPDATE_ORDER_STATUS = 'UPDATE_ORDER_STATUS'; 
export const CHANGE_SOCKET_CLIENT_ID = 'CHANGE_SOCKET_CLIENT_ID'; 

export interface IOrder {
  _id: string | null,
  idRestaurant: string | null,
  tableNumber: number,
  clientId: string,
  trackingCode:string,
  extraInfo: string,
  itemsOrder: {
    itemsFood: [],
    itemsDrink: [],
  }
  state: number,
  date: Date | null
}
 
interface SetOrderAction {
  type: string;
  payload: IOrder[];
}

export type IOrders= SetOrderAction;