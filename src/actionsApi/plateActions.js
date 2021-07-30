import PlateService from "../services/PlateService";
import store from "../store";
import { setOpenMessageAlert } from "../store/actions/messageAlertActions";


const dispatch = store.dispatch;
const service = new PlateService();

export const getAllPlates = async () => {
  const response = await service.getAllPlates()
  if (response.status === 200) {

    // dispatch(setDataToTables(response.data))
  }
  //dispatch(apiCallSuccess())
return response.data
}


/* const createPlate = (body) => {
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
} */

/* export const createPlate = async ( body) => {
  return new Promise(async (resolve, reject) => {
    service.createPlate(body).then((response) => {
      debugger
      if(response.status === 200){
        resolve (response.data)
      } 
     }).catch((error)=>{
       debugger
      reject (error)
     })
  })
} */

export const createPlate = async ( body) => {
  const response = await  service.createPlate(body)
  if(response.status === 200){
    dispatch(setOpenMessageAlert({ show: true, message:'Se creo correctamente el platillo', severity: 'success' }));
    return (response.data)
  } 
  return false
}


export const updatePlate = async ( idPlate, body) => {
  const response = await  service.updatePlate(idPlate, body)
  if(response.status === 200){
    dispatch(setOpenMessageAlert({ show: true, message:'Se actualizo correctamente el platillo', severity: 'success' }));
    return ({plate:response.data.plate.value})
  } 
  return false
}

/* export const updatePlate = async (idPlate, body) => {
  return new Promise(async (resolve, reject) => {
    service.updatePlate(idPlate, body).then((response) => {
      if(response.status === 200){
    dispatch(setOpenMessageAlert({ show: true, message:'Se actualizo correcatemente el platillo', severity: 'success' }));
        resolve ({plate:response.data.plate.value})
      } 
     }).catch((error)=>{
      reject (error)
     })
  })
} */

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
  if(typeof body.urlImage === 'object' ){
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