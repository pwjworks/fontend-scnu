import axios from "axios"

export default function updateUsers(params) {
    return new Promise((resolve, reject) => {
        axios.post("http://localhost:8080/updateUser", params).then((response) => {
            resolve(response);
        }, (error) => {
            reject(error);
        });
    })
}