import { postFetcher } from "../fechers"

export default function addCustomer(params) {
    return postFetcher("customers/addCustomer", params);
}