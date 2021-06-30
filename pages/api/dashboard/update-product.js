import { postFetcher } from "../fechers"

export default function updateCustomer(params) {
    return postFetcher("admin_product/updateProduct", params);
}
