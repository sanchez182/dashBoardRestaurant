import { IOrder, IOrders,SET_ORDER_STATE} from './actionsInterfaces/IOrdersActions';
 
export const setOrderState = (payload: IOrder[]):
IOrders => {
  return {
    type: SET_ORDER_STATE,
    payload 
  }
}