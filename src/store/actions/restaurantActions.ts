import { GET_RESTAURANT,UPDATE_SELECTED_TABLE , SET_ORDER_STATE,IRestaurant,
  IModelRestaurant} from './actionsInterfaces/IRestaurantActions';


export const setRestaurantData = (payload: IModelRestaurant):
IRestaurant => {
  return {
    type: GET_RESTAURANT,
    payload 
  }
}

export const checkRestaurantTableSeledted = (payload: any):
IRestaurant => {
  return {
    type: UPDATE_SELECTED_TABLE,
    payload 
  }
}

export const setOrderState = (payload: any):
IRestaurant => {
  return {
    type: SET_ORDER_STATE,
    payload 
  }
}