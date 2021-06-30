import { postFetcher } from "../fechers"

export default function delCustomers(params) {
    return postFetcher("customers/delCustomers", params);
}
