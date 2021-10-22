
export const SET_ORDER_STATE = 'SET_ORDER_STATE';
export const UPDATE_ORDER_STATUS = 'UPDATE_ORDER_STATUS';
export const CHANGE_SOCKET_CLIENT_ID = 'CHANGE_SOCKET_CLIENT_ID';
export const CHECK_ITEM_ISREADY = 'CHECK_ITEM_ISREADY';

export interface IOrder {
  _id: string | null,
  idRestaurant: string | null,
  tableNumber: number,
  clientId: string,
  trackingCode: string,
  extraInfo: string,
  itemsOrder: {
    itemsFood: [{
      quantity: number;
      isReady: boolean;
      authorized: boolean;
      plate: {
        _id: string,
        plateName: string,
        price: number,
        ingredients: []
      }
    }],
    itemsDrink: [{
      quantity: number;
      isReady: boolean;
      authorized: boolean;
      drink: {
        _id: string,
        drinkName: string,
        price: number,
        ingredients: []
      }
    }],
  }
  state: number,
  date: Date | null
}

interface SetOrderAction {
  type: string;
  payload: IOrder[];
}

export type IOrders = SetOrderAction;