import CommonService from "./CommonService";

class StockService {
    endPoint = '/stock/' 
    baseUrl = process.env.REACT_APP_API_DASHBOARD_URL;

    
    private commonService : CommonService;

    constructor(){
        this.commonService = new CommonService(this.baseUrl);
    }
    
     private addStock = async ( data: any)=>{
        return  this.commonService.postRequest(`${this.endPoint}addItemStock`,data,true)
        }
}

export default StockService;