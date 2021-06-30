import { getFetcher } from "../fechers"

export default function getProductsId() {
    return getFetcher("products/getProductsIds");
}
