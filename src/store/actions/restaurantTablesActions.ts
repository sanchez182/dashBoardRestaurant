import { IRestaurantTables,CHECKING_TABLE_SELETED,GET_RESTAURANT_TABLE, IModelRestaurantTable } from './actionsInterfaces/IRestaurantTablesActions';


export const getRestaurantTables = (payload: IModelRestaurantTable): IRestaurantTables => {
  return {
    type: GET_RESTAURANT_TABLE,
    payload 
  }
}

export const checkRestaurantTableSeledted = (): any => {
  return {
    type: CHECKING_TABLE_SELETED
  }
}

