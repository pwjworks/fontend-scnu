import { getFetcher } from "../fechers";

export default function getOrders(username) {
    return getFetcher("http://localhost:8080/ShoppingCart/getOrders?username=" + username);
}