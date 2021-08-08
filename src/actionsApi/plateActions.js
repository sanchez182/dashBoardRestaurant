import PlateService from "../services/PlateService";
import store from "../store";
import { setOpenMessageAlert } from "../store/actions/messageAlertActions";


const dispatch = store.dispatch;
const service = new PlateService();

export const getAllPlates = async () => {
  const response = await service.getAllPlates()
  return response.data
}

export const deletePlates = async (platesId) => {
  const response = await service.deletePlates(platesId)
  return response.data
}

export const createPlate = async (body) => {
  const response = await service.createPlate(body)
  dispatch(setOpenMessageAlert({ show: true, message: 'Se creo correctamente el platillo', severity: 'success' }));
  return (response.data)
}


export const updatePlate = async (idPlate, body) => {
  const response = await service.updatePlate(idPlate, body)
  if (response.status === 200) {
    dispatch(setOpenMessageAlert({ show: true, message: 'Se actualizo correctamente el platillo', severity: 'success' }));
    return ({ plate: response.data.plate.value })
  }
  return false
}

/* const updatePlate =async (idTable, body) => {
  return (dispatch,)  => {
    return await service.updatePlate(idTable, body).then((response) => {
      if (response.status === 200) {
        dispatch(apiCallSuccess())
        dispatch(setOpenMessageAlert({ show: true, message: 'Se actualizo correcatemente el platillo', severity: 'success' }));
        return (response)
      }
    }).catch((error) => {
      dispatch(apiCallSuccess())
      dispatch(setOpenMessageAlert({ show: true, message: 'Error al actualizar el platillo', severity: 'error' }));
      return (error)
    })
  }
} */


export const createOrUpdatePlate = async (body) => {
  let dataImage = null
  if (typeof body.urlImage === 'object') {
    dataImage = body.urlImage
    body.urlImage = dataImage.secure_url
    body.idImg = dataImage.public_id
  }

  const id = body._id;
  delete body._id;
  if (id) {
    return await updatePlate(id, body)
  } else {
    return await createPlate(body)
  }
}