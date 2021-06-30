import { postFetcher } from "../fechers";

export default function intoOrder(params) {
    return postFetcher("http://localhost:8080/cartItem/intoOrder", params);
}