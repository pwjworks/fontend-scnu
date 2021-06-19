import axios from "axios"

export default function getUsers() {
    return new Promise((resolve, reject) => {
        axios.get("http://localhost:8080/users").then((response) => {
            resolve(response);
        }, (error) => {
            reject(error);
        });
    })
}