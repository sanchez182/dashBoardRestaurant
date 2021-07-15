import interceptorHttp from "../helpers/interceptorHttp";

class TableService {
    endPoint = '/tables/'
    baseUrl = process.env.REACT_APP_API_DASHBOARD_URL;

    getHttp = () => {
        return interceptorHttp(this.baseUrl);
    }

    getDataTables = async () => {
        return this.getRequest(`${this.endPoint}`)
        //  return  this.getRequest(`${this.endPoint}`)
    }

    createTable =(body:any)=>{
        return this.postRequest(`${this.endPoint}`,body)
    }

    updateRestaurantInfo = async (data: any) => {
        return this.pustRequest(`${this.endPoint}`, data)
    }

    private postRequest = async (endpoint: String, data: any) => {
        return new Promise(async (resolve, reject) => {
            this.getHttp()
                .post(`${endpoint}`, data)
                .then(response => {
                    resolve(response)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }

    private pustRequest = async (endpoint: String, data: any) => {
        return new Promise(async (resolve, reject) => {
            this.getHttp()
                .put(`${endpoint}`, data)
                .then(response => {
                    resolve(response)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }


    private getRequest = async (endpoint: String) => {
        return new Promise(async (resolve, reject) => {
            this.getHttp()
                .get(`${endpoint}`)
                .then(response => {
                    resolve(response)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }
}

export default TableService;