
import {
  GET_RESTAURANT, UPDATE_SELECTED_TABLE, IRestaurant,
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
  tableList: []
}


const restaurantReducer = (state = initialState, action: IRestaurant) => {
  switch (action.type) {
    case GET_RESTAURANT:
      return {
        ...state,
        ...action.payload
      }
    case UPDATE_SELECTED_TABLE:
      debugger
      return {
        ...state,
        tableList: action.payload
      }
    default:
      return state;
  }
}

export default restaurantReducer;