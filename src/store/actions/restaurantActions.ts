import { GET_RESTAURANT,SET_SERVICES,UPDATE_SELECTED_TABLE ,IRestaurant,
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

export const setDataService = (payload: any):
IRestaurant => {
  return {
    type: SET_SERVICES,
    payload 
  }
}