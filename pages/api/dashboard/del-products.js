import { postFetcher } from "../fechers"

export default function delProducts(params) {
    return postFetcher("admin_product/delProducts", params);
}
