import CommonService from "./CommonService";
class UtilsService {
    endPoint = '/appStatus/'
    baseUrl = process.env.REACT_APP_API_DASHBOARD_URL;

    private commonService : CommonService;

    constructor(){
        this.commonService = new CommonService(this.baseUrl);
    }

    getAppStatus = async () => {
        return this.commonService.getRequest(`${this.endPoint}`,true)
    }

}

export default UtilsService;