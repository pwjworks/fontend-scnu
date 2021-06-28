import { postFetcher } from "../fechers"

export default function updateCustomer(params) {
    return postFetcher("http://localhost:8080/admin_product/updateProduct", params);
}
