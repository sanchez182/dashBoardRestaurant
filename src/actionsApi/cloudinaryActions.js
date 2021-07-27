import CloudinaryService from "../services/CloudinaryService";
import { setOpenMessageAlert } from "../store/actions/messageAlertActions";
import { apiCallSuccess } from "../store/actions/requestActions"; 
import { setDataToTables } from "../store/actions/tableActions";
 


 const service = new CloudinaryService();
 
 export const getImages = () => { 
  return (dispatch,) => {
      return  service.getRestaurantImages().then((response)=>{
        
        if(response.status === 200){
          dispatch(apiCallSuccess())  
          //dispatch(setDataToTables(response.data))
          return (response.data)
        } 
       }).catch((error)=>{
        dispatch(apiCallSuccess())  
        return (error)
       })
  }
 }

/*  export const uploadImageToRestaurant = (body)=>async(dispatch)=>{
  const response = await service.uploadImageToRestaurant(body) 
  if(response.status === 200){
    
 // dispatch(setDataToTables(response.data))
  }
  dispatch(apiCallSuccess())

} */
 

export const uploadImageToRestaurant = async (body) => { 
  return new Promise(async (resolve, reject) => {
      service.uploadImageToRestaurant(body).then((response)=>{
      if(response.status === 200){
        //dispatch(setDataToTables(response.data))
        resolve (response.data.uploadedImage)
      } 
     }).catch((error)=>{
      reject (error)
     })
  })
}