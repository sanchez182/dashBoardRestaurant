export const SET_AUTH_LOGIN = 'SET_AUTH_LOGIN';
export const CHECKING_FINISH = 'CHECKING_FINISH';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';



export interface IPayloadAuth {
     uid: any,
     name: String | null,
     checking: boolean,
     wasDasborad: boolean
}

interface SetAuthAction {
  type: String;
  payload: IPayloadAuth;
}

export type IAuthActions = SetAuthAction;