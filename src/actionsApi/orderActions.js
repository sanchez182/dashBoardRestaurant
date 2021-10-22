import OrderService from "../services/OrderService";
import store from "../store";
import { setOpenMessageAlert } from "../store/actions/messageAlertActions";


const dispatch = store.dispatch;
const service = new OrderService();

export const getAllOrders = async () => {
  const response = await service.getAllOrders()
  return response.data
}

export const getOrderById = async (id) => {
  const response = await service.getOrderById(id)
  return response.data
}


export const deleteOrders = async (OrdersId) => {
  const response = await service.deleteOrders(OrdersId)
  return response.data
}

export const createOrder = async (body) => {
  const response = await service.createOrder(body)
  dispatch(setOpenMessageAlert({ show: true, message: 'Se creo correctamente el orden', severity: 'success' }));
  return (response.data)
}


export const updateOrder = async (idOrder, body) => {
  const response = await service.updateOrder(idOrder, body)
  if (response.status === 200) {
    dispatch(setOpenMessageAlert({ show: true, message: 'Se actualizo correctamente el orden', severity: 'success' }));
    return ({ Order: response.data.Order.value })
  }
  return false
}

export const updateOrderStatus = async (state, idOrder) => {
  const response = await service.updateOrderStatus(state, idOrder)
    dispatch(setOpenMessageAlert({ show: true, message: 'Se actualizo el estado de la orden', severity: 'success' }));
  return response.data
}



export const createOrUpdateOrder = async (body) => {
  let dataImage = null
  if (typeof body.urlImage === 'object') {
    dataImage = body.urlImage
    body.urlImage = dataImage.secure_url
    body.idImg = dataImage.public_id
  }

  const id = body._id;
  delete body._id;
  if (id) {
    return await updateOrder(id, body)
  } else {
    return await createOrder(body)
  }
}