import { getFetcher } from "../fechers"

export default function getCustomers() {
    return getFetcher("customers/getCustomers");
}
