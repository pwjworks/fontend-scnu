import { postFetcher } from "../fechers";

export default function intoOrder(params) {
    return postFetcher("cartItem/intoOrder", params);
}