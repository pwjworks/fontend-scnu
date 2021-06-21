import axios from "axios"

export function getFetcher(url) {
    return new Promise((resolve, reject) => {
        axios.get(url).then((response) => {
            resolve(response);
        }, (error) => {
            reject(error);
        });
    })
}

export function postFetcher(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params).then((response) => {
            resolve(response);
        }, (error) => {
            reject(error);
        });
    })
}