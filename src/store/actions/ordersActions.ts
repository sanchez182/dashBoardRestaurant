import { IOrders, IOrdersModel,SET_ORDER_STATE} from './actionsInterfaces/IOrdersActions';
 

/* 

export const checkRestaurantTableSeledted = (payload: any):
IRestaurant => {
  return {
    type: UPDATE_SELECTED_TABLE,
    payload 
  }
} */

export const setOrderState = (payload: IOrdersModel):
IOrders => {
  return {
    type: SET_ORDER_STATE,
    payload 
  }
}