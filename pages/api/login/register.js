import { postFetcher } from "../fechers"

export default function register(params) {
    return postFetcher("http://localhost:8080/user/create", params);
}