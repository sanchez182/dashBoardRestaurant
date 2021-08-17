import { IOrder, IOrders,SET_ORDER_STATE,CHANGE_SOCKET_CLIENT_ID,UPDATE_ORDER_STATUS} from './actionsInterfaces/IOrdersActions';
 
export const setOrderState = (payload: IOrder[]):
IOrders => {
  return {
    type: SET_ORDER_STATE,
    payload 
  }
}

export const updateOrderStatusAction = (payload: any):
IOrders => {
  return {
    type: UPDATE_ORDER_STATUS,
    payload 
  }
} 

export const updateSocketClientId = (payload: any):
IOrders => {
  return {
    type: CHANGE_SOCKET_CLIENT_ID,
    payload 
  }
} 