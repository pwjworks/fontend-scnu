import { getFetcher } from "../fechers"

export default function getProducts() {
    return getFetcher("http://localhost:8080/product.json");
}
