import { getFetcher } from "../fechers"

export default function getProductsId() {
    return getFetcher("http://localhost:3000/ids.json");
}
