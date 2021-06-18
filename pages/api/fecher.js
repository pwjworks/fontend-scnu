import axios from 'axios'
const getFetcher = url => axios.get(url).then(res => res.data)

export default getFetcher