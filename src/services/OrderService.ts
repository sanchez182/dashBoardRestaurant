import CommonService from "./CommonService";

class OrderService {
    endPoint = '/order/'
    baseUrl = process.env.REACT_APP_API_DASHBOARD_URL;

    
    
    private commonService : CommonService;

    constructor(){
        this.commonService = new CommonService(this.baseUrl);
    }
    
    getAllOrders = async () => {
        return this.commonService.getRequest(`${this.endPoint}`,true)
    }

    getOrderById = async (id:string) => {
        return this.commonService.getRequest(`${this.endPoint}${id}`,true)
    }

    createOrder =async (body:any)=>{
        return await this.commonService.postRequest(`${this.endPoint}`,body,true)
    }
 
    updateOrder = async (idOrder:string,body:any)=>{
        return this.commonService.pustRequest(`${this.endPoint}${idOrder}`,body,true)
    }

    deleteOrders = async (data:any) => {
        return this.commonService.deleteWithDataRequest(`${this.endPoint}`,data,true)
    }
    

}

export default OrderService;