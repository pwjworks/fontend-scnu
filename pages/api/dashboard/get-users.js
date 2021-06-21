import { getFetcher } from "../fechers"

export default function delUsers() {
    return getFetcher("http://localhost:8080/users");
}
