import { postFetcher } from "../fechers"

export default function delUsers(params) {
    return postFetcher("http://localhost:8080/delUsers", params);
}
