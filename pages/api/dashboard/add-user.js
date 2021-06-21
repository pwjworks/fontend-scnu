import { postFetcher } from "../fechers"

export default function addUsers(params) {
    return postFetcher("http://localhost:8080/addUser", params);
}