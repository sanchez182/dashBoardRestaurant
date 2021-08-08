import interceptorHttp from "../helpers/interceptorHttp";

class CommonService {


    private baseUrl : string; 

    constructor(baseUrl : any){
        this.baseUrl = baseUrl
    }
    getHttp = (token:boolean) => {
        return interceptorHttp(this.baseUrl,token);
    }

    public  postRequest = async (endpoint: String, data: any,token:boolean) => {
        return new Promise(async (resolve, reject) => {
            this.getHttp(token)
                .post(`${endpoint}`, data)
                .then(response => {
                    resolve(response)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }

    public pustRequest = async (endpoint: String, data: any,token:boolean) => {
        return new Promise(async (resolve, reject) => {
            this.getHttp(token)
                .put(`${endpoint}`, data)
                .then(response => {
                    resolve(response)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }


    public getRequest = async (endpoint: String,token:boolean) => {
        return new Promise(async (resolve, reject) => {
            this.getHttp(token)
                .get(`${endpoint}`)
                .then(response => {
                    resolve(response)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }

    public deleteWithDataRequest = async (endpoint: String,data:any,token:boolean) => {
        return new Promise(async (resolve, reject) => {
            this.getHttp(token)
                .delete(`${endpoint}`, { data })
                .then(response => {
                    resolve(response)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }

    public deleteByIdRequest = async (endpoint: string,token:boolean) => {
        return new Promise(async (resolve, reject) => {
            this.getHttp(token)
                .delete(endpoint)
                .then(response => {
                    resolve(response)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }

   
}

export default CommonService;