import { getFetcher } from "../fechers";

export default function getShoppingCart() {
    return getFetcher("http://localhost:8080/ShoppingCart/getAll");
}