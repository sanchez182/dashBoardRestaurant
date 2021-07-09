import interceptorHttp from "../helpers/interceptorHttp";

class StockService {
    endPoint = '/stock/' 
    baseUrl = process.env.REACT_APP_API_DASHBOARD_URL;

    getHttp =()=>{
        return interceptorHttp(this.baseUrl, localStorage.getItem('token'));
      }
    
      addStock = async ( data: any)=>{
          
        return  this.postRequest(`${this.endPoint}addItemStock`,data)
        }

        
     private postRequest = async (endpoint:String,data: any)=>{
        return new Promise(async (resolve,reject)=>{
            this.getHttp()
            .post(`${endpoint}`,data)
            .then(response=>{
                resolve(response)
            })
            .catch((error)=>{
                reject(error)
            })
        })
    }

     private getRequest = async (endpoint: String)=>{
        return new Promise(async (resolve,reject)=>{
            this.getHttp()
            .get(`${endpoint}`)
            .then(response=>{
                resolve(response)
            })
            .catch((error)=>{
                reject(error)
            })
        })
    } 
}

export default StockService;