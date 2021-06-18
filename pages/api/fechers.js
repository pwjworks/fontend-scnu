import axios from 'axios'
const getFetcher = url => axios.get(url).then(res => res.data);
const postFetcher = (url, params) => axios.post(url, params).then(res => res.data);

export { getFetcher, postFetcher };