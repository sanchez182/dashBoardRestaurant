import { SET_TABLES,UPDATE_SELECTED_TABLE ,ITableModel,
  ITableAction} from './actionsInterfaces/ITableActions';


export const setDataToTables = (payload: ITableModel[]):
ITableAction => {
  return {
    type: SET_TABLES,
    payload 
  }
}

export const checkRestaurantTableSeledted = (payload: any):
ITableAction => {
  return {
    type: UPDATE_SELECTED_TABLE,
    payload 
  }
}
