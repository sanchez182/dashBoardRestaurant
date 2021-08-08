import { ITableAction, ITableModel, SET_TABLES,ADD_TABLE,UPDATE_SELECTED_TABLE } from './../actions/actionsInterfaces/ITableActions';


const tablesReducer  = (state: ITableModel[] = [], action: ITableAction) => {
  switch (action.type) {
    case SET_TABLES:
      return action.payload
      
    case UPDATE_SELECTED_TABLE:
      return  [ ...state,action.payload]
    
    case ADD_TABLE :
      debugger
      const data = [...state]
      data.push(action.payload[0]) 
      return  data
    default:
      return state;
  }
}

export default tablesReducer;