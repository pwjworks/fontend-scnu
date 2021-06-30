import axios from "axios"

axios.interceptors.request.use(
    (config) =>{
        if (typeof window !== 'undefined') {
            let token=localStorage.getItem('Authorization');
            if(token!==undefined){
                config.headers['Authorization']=localStorage.getItem('Authorization');
            }
        }
        return config;
    },err=>{
        console.log(err);
    }
)

export function getFetcher(url) {
    return new Promise((resolve, reject) => {
        axios.get("http://ssmnginx:8080/"+url).then((response) => {
            resolve(response);
        }, (error) => {
            reject(error);
        });
    })
}

export function postFetcher(url, params) {
    return new Promise((resolve, reject) => {
        axios.post("http://ssmnginx:8080/"+url, params).then((response) => {
            resolve(response);
        }, (error) => {
            reject(error);
        });
    })
}