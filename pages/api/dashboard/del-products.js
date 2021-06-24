import { postFetcher } from "../fechers"

export default function delProducts(params) {
    return postFetcher("http://localhost:8080/products/delProducts", params);
}
