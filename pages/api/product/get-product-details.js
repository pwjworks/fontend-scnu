import { getFetcher } from "../fechers";

export default function getProductDetails(id) {
    return getFetcher("products/getProductDetail?id=" + id);
}