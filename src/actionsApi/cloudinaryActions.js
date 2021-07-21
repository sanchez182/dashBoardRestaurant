import CloudinaryService from "../services/CloudinaryService";
import { setOpenMessageAlert } from "../store/actions/messageAlertActions";
import { apiCallSuccess } from "../store/actions/requestActions"; 
import { setDataToTables } from "../store/actions/tableActions";
 


 const service = new CloudinaryService();

 export const getIamges = ()=>async(dispatch)=>{
    const response = await service.getRestaurantImages() 
    if(response.status === 200){
      debugger
   // dispatch(setDataToTables(response.data))
    }
    dispatch(apiCallSuccess())

 }

/*  export const uploadImageToRestaurant = (body)=>async(dispatch)=>{
  const response = await service.uploadImageToRestaurant(body) 
  if(response.status === 200){
    debugger
 // dispatch(setDataToTables(response.data))
  }
  dispatch(apiCallSuccess())

} */

export const uploadImageToRestaurant = (body) => { 
 return (dispatch,) => {
     return  service.uploadImageToRestaurant(body).then((response)=>{
       debugger
       if(response.status === 200){
         dispatch(apiCallSuccess()) 
         dispatch(setOpenMessageAlert({ show: true, message:'Se creo correcatemente la imagen', severity: 'success' }));
         //dispatch(setDataToTables(response.data))
         return (response.data.uploadedImage)
       } 
      }).catch((error)=>{
       dispatch(apiCallSuccess()) 
       dispatch(setOpenMessageAlert({ show: true, message:'Error al intentar crear la imagen', severity: 'error' }));
       return (error)
      })
 }
}
