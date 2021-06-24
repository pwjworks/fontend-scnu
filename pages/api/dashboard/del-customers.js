import { postFetcher } from "../fechers"

export default function delCustomers(params) {
    return postFetcher("http://localhost:8080/customers/delCustomers", params);
}
