import { postFetcher } from "../fechers"

export default function addCustomer(params) {
    return postFetcher("http://localhost:8080/customers/addCustomer", params);
}