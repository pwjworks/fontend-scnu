import { postFetcher } from "../fechers"

export default function login(params) {
    return postFetcher("http://localhost:8080/user/login", params);
}