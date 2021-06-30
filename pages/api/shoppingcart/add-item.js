import { getFetcher } from "../fechers";

export default function addCartItem(username, productId) {
    return getFetcher("cartItem/addItem?username=" + username + "&productId=" +
        productId);
}