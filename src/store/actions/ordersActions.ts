import { IOrder, IOrders,SET_ORDER_STATE,UPDATE_ORDER_STATUS} from './actionsInterfaces/IOrdersActions';
 
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