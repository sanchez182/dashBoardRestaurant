export const SET_TABLES = 'SET_TABLES';
export const UPDATE_SELECTED_TABLE = 'UPDATE_SELECTED_TABLE';
 

export interface ITableModel{
  _id: string | null,
  tableNumber : number,
  selected : boolean ,
  type : string ,
  state : string ,
}


interface SetTableAction {
  type: String;
  payload: ITableModel[];
}

export type ITableAction = SetTableAction;