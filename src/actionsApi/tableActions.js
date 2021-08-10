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
  return true
}

export const updateTable = async (idTable, body) => {
  delete body._id;
  delete body.__v;
  const response = await service.updateTable(idTable, body)
  dispatch(setOpenMessageAlert({ show: true, message: `Se actualizó correctamente la mesa número ${response.data.table.value.tableNumber}`, severity: 'success' }));
  dispatch(checkRestaurantTableSeledted([response.data.table.value]))
  return true
}


export const createOrUpdateTable = async (body) => {
  const id = body._id;
  delete body._id;
  if (id) {
    return await updateTable(id, body)
  } else {
    return await createTable(body)
  }
}