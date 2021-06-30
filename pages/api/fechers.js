import axios from "axios"

axios.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      let token = localStorage.getItem('Authorization');
      if (token !== undefined) {
        config.headers['Authorization'] = localStorage.getItem('Authorization');
      }
    }
    return config;
  }, err => {
    console.log(err);
  }
)

export function getFetcher(url) {
  return new Promise((resolve, reject) => {
    axios.get("http://218.192.111.13/" + url).then((response) => {
      resolve(response);
    }, (error) => {
      reject(error);
    });
  })
}

export function postFetcher(url, params) {
  return new Promise((resolve, reject) => {
    axios.post("http://218.192.111.13/" + url, params).then((response) => {
      resolve(response);
    }, (error) => {
      reject(error);
    });
  })
}