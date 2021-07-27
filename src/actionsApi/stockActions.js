import StockService from "../services/StockService";
import { setOpenMessageAlert } from "../store/actions/messageAlertActions";
import { apiCallSuccess } from "../store/actions/requestActions";

 const service = new StockService();


 export const addStock = (body) => {
  return (dispatch) => {
      return  service.addStock(body).then((response)=>{
        
        if(response.status === 200){
          dispatch(apiCallSuccess())
          dispatch(setOpenMessageAlert({ show: true, message:'Intem se agrego', severity: 'success' }));
          return (response)
        } 
       }).catch((error)=>{
        return (error)
       })
  }
}