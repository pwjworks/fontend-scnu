import { postFetcher } from "../fechers"

export default function updateCustomer(params) {
    return postFetcher("customers/updateCustomer", params);
}
