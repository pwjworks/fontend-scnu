import { postFetcher } from "../fechers"

export default function updateCustomer(params) {
    return postFetcher("http://localhost:8080/customers/updateCustomer", params);
}
