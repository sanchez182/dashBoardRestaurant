  
import { createStore, combineReducers,applyMiddleware } from 'redux';
import { authReducer } from './reducers/authReducer';
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import langReducer from './reducers/langReducer';
import menuItemReducer from './reducers/menuItemsReducer';
import draweReducer from './reducers/drawerReducer';
import alertComponentReducer from './reducers/alertComponentReducer';
import requestReducer from './reducers/requestReducer';
import restaurantReducer from './reducers/restaurantReducer ';
import { AUTH_LOGOUT } from './actions/actionsInterfaces/IAuthActions';

const appReducer = combineReducers({
  lang: langReducer,
  auth: authReducer,
  drawerState: draweReducer,
  menuItemReducer,
  openMessageAlert:alertComponentReducer,
  requestReducer,
  restaurantData: restaurantReducer
});
 
const rootReducer  = (state:any, action:any) => {
if (action.type === AUTH_LOGOUT) {
  state = undefined
}
 return appReducer(state, action)
}


const middleware = [thunk]
const store = createStore(rootReducer,{}, composeWithDevTools(applyMiddleware(...middleware)));

export type RootState = ReturnType<typeof rootReducer>;

export default store;