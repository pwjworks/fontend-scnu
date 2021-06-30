import { postFetcher } from "../fechers"

export default function addCustomer(params) {
    return postFetcher("admin_product/addProduct", params);
}