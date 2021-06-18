import axios from "axios"

export default function delUsers(params) {
    return new Promise((resolve, reject) => {
        axios.post("http://localhost:8080/delUsers", params).then((response) => {
            resolve(response);
        }, (error) => {
            reject(error);
        });
    })
}
