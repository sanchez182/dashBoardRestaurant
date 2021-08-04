import DrinkService from "../services/DrinkService";
import store from "../store";
import { setOpenMessageAlert } from "../store/actions/messageAlertActions";


const dispatch = store.dispatch;
const service = new DrinkService();

export const getAllDrinks = async () => {
  const response = await service.getAllDrinks()
  if (response.status === 200) {
  }
return response.data
}


export const createDrink = async ( body) => {
  const response = await  service.createDrink(body)
  if(response.status === 200){
    dispatch(setOpenMessageAlert({ show: true, message:'Se creo correctamente la bebida', severity: 'success' }));
    return (response.data)
  } 
  return false
}


export const updateDrink = async ( idPlate, body) => {
  const response = await  service.updateDrink(idPlate, body)
  if(response.status === 200){
    dispatch(setOpenMessageAlert({ show: true, message:'Se actualizo correctamente la bebida', severity: 'success' }));
    return ({drink:response.data.drink.value})
  } 
  return false
}


export const createOrUpdateDrink = async (body) => {
  let dataImage = null
  if(typeof body.urlImage === 'object' ){
    dataImage = body.urlImage
    body.urlImage = dataImage.secure_url
    body.idImg = dataImage.public_id
  }

  const id = body._id;
  delete body._id;
  if (id) {
    return await updateDrink(id, body)
  } else {
    return await createDrink(body)
  }
}