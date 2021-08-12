
export const SET_APP_STATUS = 'SET_APP_STATUS'; 

export interface ILabelStatus {
  id :number
  labelES:string,
  labelEN: string
}
export interface IAppStatus {
  _id: string | null,
  orderStatus:any[],
  tableStatus:any[]

}

interface SetAppStatusAction {
  type: string;
  payload: IAppStatus;
}

export type IAppStatusActions= SetAppStatusAction;