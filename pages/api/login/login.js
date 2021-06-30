import { postFetcher } from "../fechers"

export default function login(params) {
    return postFetcher("login", params);
}