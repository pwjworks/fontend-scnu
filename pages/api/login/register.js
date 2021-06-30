import { postFetcher } from "../fechers"

export default function register(params) {
    return postFetcher("user/create", params);
}