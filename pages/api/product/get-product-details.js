import { getFetcher } from "../fechers";

export default function getProductDetails(id) {
    return getFetcher("http://localhost:8080/" + id + ".json");
}