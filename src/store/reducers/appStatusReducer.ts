import { SET_APP_STATUS, IAppStatusActions } from '../actions/actionsInterfaces/IAppStatusActions';



const appStatusReducer = (state : any = {}, action: IAppStatusActions) => {
  switch (action.type) {
    case SET_APP_STATUS:
      return action.payload

    default:
      return state;
  }
}

export default appStatusReducer;