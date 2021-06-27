import { getFetcher } from "../fechers"

export default function searcher(keywords) {
    return getFetcher("http://localhost:8080/search/product/"+keywords);
}
