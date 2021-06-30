import { getFetcher } from "../fechers";

export default function getShoppingCart(username) {
    return getFetcher("ShoppingCart/getCart?username="+username);
}