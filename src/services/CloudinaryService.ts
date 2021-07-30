import CommonService from "./CommonService";

class CloudinaryService {
    endPoint = '/cloudinary/'
    baseUrl = process.env.REACT_APP_API_DASHBOARD_URL;

    private commonService : CommonService;

    constructor(){
        this.commonService = new CommonService(this.baseUrl);
    }

    getRestaurantImages = async () => {
        return this.commonService.getRequest(`${this.endPoint}`,true)
    }

    uploadImageToRestaurant =(body:any)=>{
        return this.commonService.postRequest(`${this.endPoint}`,body,true)
    }

    // updateTable =(idTable:string,body:any)=>{
    //     return this.commonService.pustRequest(`${this.endPoint}/${idTable}`,body)
    // }



}

export default CloudinaryService;