import { getFetcher } from "../fechers";

export default function getOrders(username) {
    return getFetcher("ShoppingCart/getOrders?username=" + username);
}