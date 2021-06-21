import { postFetcher } from "../fechers"

export default function updateUser(params) {
    return postFetcher("http://localhost:8080/updateUser", params);
}
