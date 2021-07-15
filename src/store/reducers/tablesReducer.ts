import { ITableAction, ITableModel, SET_TABLES,UPDATE_SELECTED_TABLE } from './../actions/actionsInterfaces/ITableActions';

const tablesReducer  = (state: ITableModel[] = [], action: ITableAction) => {
  switch (action.type) {
    case SET_TABLES:
      return {
        ...state,
        ...action.payload
      }
    case UPDATE_SELECTED_TABLE:
      return {
        ...state,
        tableList: action.payload
      }
    default:
      return state;
  }
}

export default tablesReducer;