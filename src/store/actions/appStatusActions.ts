import { IAppStatusActions, IAppStatus,SET_APP_STATUS} from './actionsInterfaces/IAppStatusActions';
 
export const setAppStatus = (payload: IAppStatus):
IAppStatusActions => {
  return {
    type: SET_APP_STATUS,
    payload 
  }
}