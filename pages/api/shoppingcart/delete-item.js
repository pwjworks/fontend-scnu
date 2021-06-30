import { postFetcher } from "../fechers";

export default function updateCartItem(params) {
    return postFetcher("cartItem/deleteItem",params);
}