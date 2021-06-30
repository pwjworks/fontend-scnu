import { getFetcher } from "../fechers";

export default function getShoppingCart(username) {
    return getFetcher("http://localhost:8080/ShoppingCart/getCart?username=" + username);
}