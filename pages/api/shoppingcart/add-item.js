import { getFetcher } from "../fechers";

export default function addCartItem(username, productId) {
    return getFetcher("http://localhost:8080/cartItem/addItem?username=" + username + "&productId=" +
        productId);
}