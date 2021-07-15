import TableService from "../services/TableService";
import { setAuthLogin } from "../store/actions/authActions";
import { setOpenMessageAlert } from "../store/actions/messageAlertActions";
import { apiCallSuccess } from "../store/actions/requestActions"; 
import { setDataToTables } from "../store/actions/tableActions";
 


 const service = new TableService();

 export const getTableData = ()=>async(dispatch)=>{
    const response = await service.getDataTables() 
    
    if(response.status === 200){
      
    dispatch(setDataToTables(response.data))
    }
    dispatch(apiCallSuccess())

 }

 export const createTable = (body) => {
  debugger
 return (dispatch,) => {
     return  service.createTable(body).then((response)=>{
       debugger
       if(response.status === 200){
         dispatch(apiCallSuccess()) 
         dispatch(setOpenMessageAlert({ show: true, message:'Se creo correcatemente la mesa', severity: 'success' }));
         dispatch(setDataToTables(response.data))
         return (response)
       } 
      }).catch((error)=>{
       dispatch(apiCallSuccess()) 
       dispatch(setOpenMessageAlert({ show: true, message:'Error al intentar crear la mesa', severity: 'error' }));
       return (error)
      })
 }
}

 export const updateRestaurantInfo = (body) => {
   debugger
  return (dispatch,) => {
      return  service.updateRestaurantInfo(body).then((response)=>{
        debugger
        if(response.status === 200){
          dispatch(apiCallSuccess()) 
          dispatch(setOpenMessageAlert({ show: true, message:'Se actualizo la información correcatemente', severity: 'success' }));
          dispatch(setDataToTables(response.data))
          return (response)
        } 
       }).catch((error)=>{
        dispatch(apiCallSuccess()) 
        dispatch(setOpenMessageAlert({ show: true, message:'Error al intentar actualizar la información', severity: 'error' }));
        return (error)
       })
  }
}