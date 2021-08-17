import { SET_ORDER_STATE, IOrders, IOrder, CHANGE_SOCKET_CLIENT_ID, UPDATE_ORDER_STATUS } from '../actions/actionsInterfaces/IOrdersActions';


const isNew = (oldState: IOrder[], data: any) => {
  const newOrder = [...oldState]
  const { _id, state, extraInfo, trackingCode, idRestaurant, clientId, itemsOrder, tableNumber, } = data
  const exists = newOrder.findIndex((x) => x._id === data._id)
  if (exists > -1) {
    newOrder[exists] = data
  } else {
    newOrder.push({
      _id,
      state,
      extraInfo,
      trackingCode,
      clientId,
      tableNumber,
      idRestaurant,
      itemsOrder,
      date: null
    })
  }
  return newOrder
}

const ordersReducer = (state: IOrder[] = [], action: IOrders) => {
  switch (action.type) {
    case SET_ORDER_STATE:
      return isNew(state, action.payload)


    case UPDATE_ORDER_STATUS:
      const newState = [...state];
      const index = newState.findIndex(x => x._id === action.payload[0]._id)
      newState[index].state = action.payload[0].state
      return newState

    case CHANGE_SOCKET_CLIENT_ID:
      const stateData = [...state];
      debugger
      const indexSocket = stateData.findIndex(x => x._id === action.payload[0]._id)
      if( indexSocket >= 0) {stateData[indexSocket].clientId = action.payload[0].clientId
}      return stateData


    default:
      return state;
  }
}



export default ordersReducer;