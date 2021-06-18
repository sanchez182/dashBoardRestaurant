import { GET_RESTAURANT,UPDATE_SELECTED_TABLE ,IRestaurant,
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
