import { SET_ORDER_STATE, IOrders, IOrder } from '../actions/actionsInterfaces/IOrdersActions';


const ordersReducer = (state: IOrder[] = [], action: IOrders) => {
  switch (action.type) {
    case SET_ORDER_STATE:
      
      return action.payload

    default:
      return state;
  }
}

export default ordersReducer;