import { postFetcher } from "../fechers";

export default function updateCartItem(params) {
    return postFetcher("http://localhost:8080/cartItem/updateCart",params);
}