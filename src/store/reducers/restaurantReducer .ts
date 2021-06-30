
import {
  GET_RESTAURANT, SET_ORDER_STATE, UPDATE_SELECTED_TABLE, IRestaurant,
  IModelRestaurant
} from '../actions/actionsInterfaces/IRestaurantActions';


const initialState: IModelRestaurant = {
  _id: null,
  name: "",
  ubication: null,
  img: "",
  foodTimeList: [],
  foodTypeList: [],
  drinkTypeList: [],
  tableList: [],
  orders: []
}


const restaurantReducer = (state = initialState, action: IRestaurant) => {
  switch (action.type) {
    case GET_RESTAURANT:
      return {
        ...state,
        ...action.payload
      }
    case UPDATE_SELECTED_TABLE:
      return {
        ...state,
        tableList: action.payload
      }
      case SET_ORDER_STATE:
        return {
          ...state,
          orders: action.payload
        }
      
    default:
      return state;
  }
}

export default restaurantReducer;