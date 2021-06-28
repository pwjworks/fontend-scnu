import { postFetcher } from "../fechers"

export default function login(params) {
    return postFetcher("http://localhost:8080/login", params, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );
}