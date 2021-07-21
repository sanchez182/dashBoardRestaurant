import interceptorHttp from "../helpers/interceptorHttp";

class CommonService {


    private baseUrl : string; 

    constructor(baseUrl : any){
        this.baseUrl = baseUrl
    }
    getHttp = () => {
        return interceptorHttp(this.baseUrl);
    }

    public  postRequest = async (endpoint: String, data: any) => {
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

    public pustRequest = async (endpoint: String, data: any) => {
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


    public getRequest = async (endpoint: String) => {
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

export default CommonService;