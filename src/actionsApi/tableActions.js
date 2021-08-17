import TableService from "../services/TableService";
import store from "../store";
import { setOpenMessageAlert } from "../store/actions/messageAlertActions";
import { checkRestaurantTableSeledted } from "../store/actions/restaurantActions";
import { addNewTable, setDataToTables } from "../store/actions/tableActions";



const dispatch = store.dispatch;
const service = new TableService();

export const getTableData = () => async (dispatch) => {
  const response = await service.getDataTables()
  dispatch(setDataToTables(response.data))
}

export const deleteTable = async (tableId) => {
  const response = await service.deleteTable(tableId)
  dispatch(setOpenMessageAlert({ show: true, message: `La mesa número ${response.data.table.tableNumber} se eleminó correctamente`, severity: 'success' }));
  return true
}

export const createTable = async (body) => {
  const response = await service.createTable(body)
  dispatch(setOpenMessageAlert({ show: true, message: `Se creó correctamente la mesa número ${response.data.table.tableNumber}`, severity: 'success' }));
  dispatch(addNewTable([response.data.table]))
  return [response.data.table]
}

const getModel = (body)=>{
  const model = {...body} 
  delete model._id;
  delete model.__v;
  return model
}
export const updateTable = async (idTable, body) => { 
  const response = await service.updateTable(idTable, body)
  dispatch(setOpenMessageAlert({ show: true, message: `Se actualizó correctamente la mesa número ${response.data.table.value.tableNumber}`, severity: 'success' }));
  dispatch(checkRestaurantTableSeledted([response.data.table.value]))
  return [response.data.table.value]
}


export const createOrUpdateTable = async (body) => {
  const model  = getModel(body)
  if (body._id) {
    return await updateTable(body._id, model)
  } else {
    return await createTable(model)
  }
}