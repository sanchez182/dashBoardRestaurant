import { SET_ORDER_STATE, IOrders, IOrder,CHECK_ITEM_ISREADY, CHANGE_SOCKET_CLIENT_ID, UPDATE_ORDER_STATUS } from '../actions/actionsInterfaces/IOrdersActions';


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

const ordersReducer = (state: IOrder[] = [], action: any) => {
  let stateData = [...state];
  let indexSocket = 0;
  switch (action.type) {
    case SET_ORDER_STATE:
      return isNew(state, action.payload)


    case UPDATE_ORDER_STATUS:
      const index = stateData.findIndex(x => x._id === action.payload[0]._id)
      stateData[index].state = action.payload[0].state
      return stateData

    case CHANGE_SOCKET_CLIENT_ID: 
       indexSocket = stateData.findIndex(x => x._id === action.payload[0]._id)
      if( indexSocket >= 0) {stateData[indexSocket].clientId = action.payload[0].clientId
}      return stateData

case CHECK_ITEM_ISREADY:
  debugger
       indexSocket = stateData.findIndex(x => x._id === action.payload.order)
       const indexItem = stateData[indexSocket].itemsOrder.itemsFood.findIndex(x => x.plate._id === action.payload._id)
      if( indexItem >= 0) {stateData[indexSocket].itemsOrder.itemsFood[indexItem].isReady = action.payload.isReady
}      return stateData

    default:
      return state;
  }
}



export default ordersReducer;