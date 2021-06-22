import { getFetcher } from "../fechers"

export default function getCustomers() {
    return getFetcher("http://localhost:8080/customers/getCustomers");
}
