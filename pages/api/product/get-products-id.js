import { getFetcher } from "../fechers"

export default function getProductsId() {
    return getFetcher("http://localhost:8080/ids.json");
}
