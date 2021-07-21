import interceptorHttp from "../helpers/interceptorHttp";
import CommonService from "./CommonService";

class CloudinaryService {
    endPoint = '/cloudinary/'
    baseUrl = process.env.REACT_APP_API_DASHBOARD_URL;

    private commonService : CommonService;

    constructor(){
        this.commonService = new CommonService(this.baseUrl);
    }

    getRestaurantImages = async () => {
        return this.commonService.getRequest(`${this.endPoint}`)
    }

    uploadImageToRestaurant =(body:any)=>{
        return this.commonService.postRequest(`${this.endPoint}`,body)
    }

    // updateTable =(idTable:string,body:any)=>{
    //     return this.commonService.pustRequest(`${this.endPoint}/${idTable}`,body)
    // }



}

export default CloudinaryService;