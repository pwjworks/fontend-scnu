import { getFetcher } from "../fechers"

export default function getCustomers() {
    return getFetcher("products/getAllProducts");
}
