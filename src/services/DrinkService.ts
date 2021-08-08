import CommonService from "./CommonService";

class DrinkService {
    endPoint = '/drink/'
    baseUrl = process.env.REACT_APP_API_DASHBOARD_URL;

    
    
    private commonService : CommonService;

    constructor(){
        this.commonService = new CommonService(this.baseUrl);
    }
    
    getAllDrinks = async () => {
        return this.commonService.getRequest(`${this.endPoint}`,true)
    }

    deleteDrinks = async (idDrinks: any[]) => {
        return this.commonService.deleteWithDataRequest(`${this.endPoint}`,idDrinks,true)
    }
    
    createDrink =async (body:any)=>{
        return await this.commonService.postRequest(`${this.endPoint}`,body,true)
    }
 
    updateDrink = async (idDrink:string,body:any)=>{
        return this.commonService.pustRequest(`${this.endPoint}${idDrink}`,body,true)
    }

}

export default DrinkService;