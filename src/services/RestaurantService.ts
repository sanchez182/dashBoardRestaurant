import interceptorHttp from "../helpers/interceptorHttp";

class RestaurantService {
    endPoint = '/restaurants/' 
    baseUrl = process.env.REACT_APP_API_URL;

    getHttp =()=>{
        return interceptorHttp(this.baseUrl);
      }

      getRestaurantData = async (idRestaurant: string)=>{
      return  this.getRequest(`${this.endPoint}${idRestaurant}`)
     //  return  this.getRequest(`${this.endPoint}`)
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

export default RestaurantService;