import { createUrlImage } from "../components/cloudinaryFunctions";
import PlateService from "../services/PlateService";
import { setImages } from "../store/actions/imagesActions";
import { setOpenMessageAlert } from "../store/actions/messageAlertActions";
import { apiCallSuccess } from "../store/actions/requestActions";
import { setDataToTables } from "../store/actions/tableActions";



const service = new PlateService();

export const getAllPlates = async () => {
  const response = await service.getAllPlates()
  if (response.status === 200) {

    // dispatch(setDataToTables(response.data))
  }
  //dispatch(apiCallSuccess())
return response.data
}


const createPlate = (body) => {
  debugger
  let dataImage = null
  if(typeof body.img === 'object' ){
    dataImage = body.img
    body.img = body.img.secure_url
  }
  
  return (dispatch,) => {
    return service.createPlate(body).then((response) => {
      if (response.status === 200) {
        dispatch(apiCallSuccess())
        dispatch(setOpenMessageAlert({ show: true, message: 'Se creo correcatemente el platillo', severity: 'success' }));
        // dispatch(setDataToTables(response.data))
        if(dataImage){
        const createImage = createUrlImage(dataImage)
        dispatch(setImages(createImage))
        }
        return (response)
      }
    }).catch((error) => {
      dispatch(apiCallSuccess())
      dispatch(setOpenMessageAlert({ show: true, message: 'Error al intentar crear platillo', severity: 'error' }));
      return (error)
    })
  }
}

const updatePlate = (idTable, body) => {
  return (dispatch,) => {
    return service.updatePlate(idTable, body).then((response) => {
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
}


export const createOrUpdatePlate = (body) => {
  debugger
  if (body._id) {
    return updatePlate(body._id, body)
  } else {
    return createPlate(body)
  }
}