import { SET_ORDER_STATE, IOrdersModel, IOrder, IOrders } from '../actions/actionsInterfaces/IOrdersActions';

const initialState: IOrdersModel = {
  orders: [{
    _id: null,
    idRestaurant: null,
    tableNumber: 0,
    itemsOrder: {
      itemsFood: [],
      itemsDrink: [],
    },
    state: "",
    date: null
  }]
}


const ordersReducer = (state = initialState, action: IOrders) => {
  switch (action.type) {
    case SET_ORDER_STATE:
      return {
        ...state,
        ...action.payload
      }

    default:
      return state;
  }
}

export default ordersReducer;