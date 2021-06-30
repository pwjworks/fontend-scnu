import { getFetcher } from "../fechers"

export default function getProducts() {
    return getFetcher("products/getPopular");
}
