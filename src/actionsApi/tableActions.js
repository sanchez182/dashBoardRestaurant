import TableService from "../services/TableService";
import { setOpenMessageAlert } from "../store/actions/messageAlertActions";
import { apiCallSuccess } from "../store/actions/requestActions"; 
import { setDataToTables } from "../store/actions/tableActions";
 


 const service = new TableService();

 export const getTableData = ()=>async(dispatch)=>{
    const response = await service.getDataTables() 
    debugger
    if(response.status === 200){
      
    dispatch(setDataToTables(response.data))
    }
    dispatch(apiCallSuccess())

 }


  const createTable = (body) => {
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

 const updateTable = (idTable,body) => {
  debugger
 return (dispatch,) => {
     return  service.updateTable(idTable,body).then((response)=>{
       debugger
       if(response.status === 200){
         dispatch(apiCallSuccess()) 
         dispatch(setOpenMessageAlert({ show: true, message:'Se actualizo correcatemente la mesa', severity: 'success' }));
         dispatch(setDataToTables(response.data))
         return (response)
       } 
      }).catch((error)=>{
       dispatch(apiCallSuccess()) 
       dispatch(setOpenMessageAlert({ show: true, message:'Error al actualizar crear la mesa', severity: 'error' }));
       return (error)
      })
 }
} 


export const createOrUpdateTable=(body)=>{
  if(body._id){
    return updateTable(body._id,body)
  }else{
    return createTable(body)
  }
}