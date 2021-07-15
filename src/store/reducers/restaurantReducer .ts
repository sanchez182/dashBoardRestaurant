
import {
  GET_RESTAURANT, SET_SERVICES,UPDATE_SELECTED_TABLE, IRestaurant,
  IModelRestaurant
} from '../actions/actionsInterfaces/IRestaurantActions';


const initialState: IModelRestaurant = { restaurantInfo : {_id: null,
  name: "",
  restaurantDescription: "",
  ubication: {
    long: null,
    lat: null,
    direction: null

  }, 
  services: {express: false, inSite: false, toGo: false },
  img: "",
  schedule: [],
  foodTimeList: [],
  foodTypeList: [{
    foodTypeName: "",
    isActive: false,
    showInApp: false,
  }],
  phoneList: [],
  drinkTypeList: []}
  
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
      case SET_SERVICES:
        return {
          ...state,
          services: action.payload
        }
    default:
      return state;
  }
}

export default restaurantReducer;