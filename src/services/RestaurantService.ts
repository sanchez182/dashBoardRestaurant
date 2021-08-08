import CommonService from "./CommonService";
class RestaurantService {
    endPoint = '/restaurant/'
    baseUrl = process.env.REACT_APP_API_DASHBOARD_URL;

    private commonService : CommonService;

    constructor(){
        this.commonService = new CommonService(this.baseUrl);
    }

    getRestaurantData = async () => {
        debugger
        return this.commonService.getRequest(`${this.endPoint}`,true)
    }

    updateRestaurantInfo = async (data: any) => {
        return this.commonService.pustRequest(`${this.endPoint}`, data,true)
    }
  
}

export default RestaurantService;