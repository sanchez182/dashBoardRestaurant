import { SET_ORDER_STATE, IOrders, IOrder, UPDATE_ORDER_STATUS } from '../actions/actionsInterfaces/IOrdersActions';


const isNew=(oldState:any,data:any)=>{
  const newOrder = [...oldState]
  const {_id,state,extraInfo,restaurant,itemsOrder,tableNumber} = data
  const exists = newOrder.findIndex((x)=> x._id === data._id)
  if(exists > -1){
      newOrder[exists] = data
  }else{
      newOrder.push({
      _id,
      state,
      extraInfo,
      tableNumber,
      idRestaurant: restaurant,
      itemsOrder
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