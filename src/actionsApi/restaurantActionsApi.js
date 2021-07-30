import RestaurantService from "../services/RestaurantService";
import store from "../store";
import { setAuthLogin } from "../store/actions/authActions";
import { setOpenMessageAlert } from "../store/actions/messageAlertActions";
import { apiCallSuccess } from "../store/actions/requestActions";
import { setDataService, setRestaurantData } from "../store/actions/restaurantActions";
 
 


 const service = new RestaurantService();

 const dispatch = store.dispatch;

 export const getRestaurantData = (body)=>async(dispatch)=>{
    const response = await service.getRestaurantData()
    dispatch(setRestaurantData({restaurantInfo:response.data}))
    dispatch(apiCallSuccess())
    dispatch( setAuthLogin({
      checking: false,
      uid: body.uid,
      name: body.name,
      token: body.token ,
      tokenExpiresIn: body.expiresIn
  }) )
 }

/*  export const updateRestaurantInfo = (body) => {
  return (dispatch,) => {
      return  service.updateRestaurantInfo(body).then((response)=>{
        if(response.status === 200){
          dispatch(apiCallSuccess()) 
          dispatch(setOpenMessageAlert({ show: true, message:'Se actualizo la información correcatemente', severity: 'success' }));
          dispatch(setRestaurantData({restaurantInfo:response.data.restaurant.value}))
          return (response)
        } 
       }).catch((error)=>{
        dispatch(apiCallSuccess()) 
        dispatch(setOpenMessageAlert({ show: true, message:'Error al intentar actualizar la información', severity: 'error' }));
        return (error)
       })
  }
} */

export const updateRestaurantInfo = async (body) => {
  return new Promise(async (resolve, reject) => {
    service.updateRestaurantInfo(body).then((response) => {
      debugger
      if(response.status === 200){
        dispatch(apiCallSuccess()) 
        dispatch(setOpenMessageAlert({ show: true, message:'Se actualizo la información correcatemente', severity: 'success' }));
        dispatch(setRestaurantData({restaurantInfo:response.data.restaurant.value}))
        resolve (true)
      } 
     }).catch((error)=>{
      dispatch(apiCallSuccess()) 
      dispatch(setOpenMessageAlert({ show: true, message:'Error al intentar actualizar la información', severity: 'error' }));
      reject (error)
     })
  })
}