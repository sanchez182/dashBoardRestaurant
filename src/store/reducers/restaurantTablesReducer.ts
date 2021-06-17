  
import { GET_RESTAURANT_TABLE,CHECKING_TABLE_SELETED,IModelRestaurantTable, IRestaurantTables } from '../actions/actionsInterfaces/IRestaurantTablesActions';


const initialState: IModelRestaurantTable [] = []

const restaurantTablesReducer = (state = initialState, action: IRestaurantTables) => {
  switch(action.type) {
    case GET_RESTAURANT_TABLE:
      return {
        ...state, 
        item: action.payload
      }
      case CHECKING_TABLE_SELETED:
      return {
        ...state, 
        item: action.payload
      }
    default:
      return state;
  }
}

export default restaurantTablesReducer;