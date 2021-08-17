import { SET_ORDER_STATE, IOrders, IOrder, UPDATE_ORDER_STATUS } from '../actions/actionsInterfaces/IOrdersActions';


const isNew=(oldState:IOrder[],data:any)=>{
  const newOrder = [...oldState]
  debugger
  const {_id,state,extraInfo,idRestaurant,clientId, itemsOrder,tableNumber, } = data
  const exists = newOrder.findIndex((x)=> x._id === data._id)
  if(exists > -1){
      newOrder[exists] = data
  }else{
      newOrder.push({
      _id,
      state,
      extraInfo,
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
      return isNew(state,action.payload) 


      case UPDATE_ORDER_STATUS:
        const newState = [...state]; 
        const index = newState.findIndex(x=> x._id === action.payload[0]._id)
        newState[index].state =  action.payload[0].state 
        return newState

    default:
      return state;
  }
}



export default ordersReducer;