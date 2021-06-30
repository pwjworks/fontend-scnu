import { getFetcher } from "../fechers"

export default function searcher(keywords) {
    return getFetcher("search/product/"+keywords);
}
