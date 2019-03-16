import axios from 'axios'
import { fetchDataUrl } from '../config'

class ApiService {
  a = axios

  fetchData = () => this.a.get(fetchDataUrl).then((res) => res.data)
}

export default new ApiService()
