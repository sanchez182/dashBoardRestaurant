import CommonService from "./CommonService";

class TableService {
    endPoint = '/tables/'
    baseUrl = process.env.REACT_APP_API_DASHBOARD_URL;

  
    
    private commonService : CommonService;

    constructor(){
        this.commonService = new CommonService(this.baseUrl);
    }
    
    getDataTables = async () => {
        return this.commonService.getRequest(`${this.endPoint}`,true)
        //  return  this.getRequest(`${this.endPoint}`)
    }

    createTable =(body:any)=>{
        return this.commonService.postRequest(`${this.endPoint}`,body,true)
    }

    updateTable =(idTable:string,body:any)=>{
        return this.commonService.pustRequest(`${this.endPoint}/${idTable}`,body,true)
    }

}

export default TableService;