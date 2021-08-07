import CommonService from "./CommonService";

class PlateService {
    endPoint = '/plate/'
    baseUrl = process.env.REACT_APP_API_DASHBOARD_URL;

    
    
    private commonService : CommonService;

    constructor(){
        this.commonService = new CommonService(this.baseUrl);
    }
    
    getAllPlates = async () => {
        return this.commonService.getRequest(`${this.endPoint}`,true)
    }

    createPlate =async (body:any)=>{
        return await this.commonService.postRequest(`${this.endPoint}`,body,true)
    }
 
    updatePlate = async (idTable:string,body:any)=>{
        return this.commonService.pustRequest(`${this.endPoint}${idTable}`,body,true)
    }

    deletePlates = async (data:any) => {
        return this.commonService.deleteRequest(`${this.endPoint}`,data,true)
    }
    

}

export default PlateService;